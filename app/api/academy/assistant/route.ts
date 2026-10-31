import { NextResponse } from "next/server";
import { getAdminAuth, isAdminConfigured } from "@/lib/firebase-admin";
import { FALLBACK, SYSTEM_PROMPT, faqAnswer } from "@/lib/academy/assistantGuide";

export const dynamic = "force-dynamic";

const MODEL = process.env.ASSISTANT_MODEL || "claude-haiku-5-5";
const MAX_CHARS = 600; // one message from the student
const KEEP = 8; // messages of history sent to the model
const LIMIT = 20; // questions per student every 10 minutes
const hits = new Map<string, number[]>();

type Msg = { role: "user" | "assistant"; content: string };

/** Who is asking: the signed-in student (token checked) or, in local tests without a Firebase key, anyone. */
async function who(request: Request): Promise<string> {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (isAdminConfigured()) {
    if (!token) throw new Error("401");
    try {
      return (await getAdminAuth().verifyIdToken(token)).uid;
    } catch {
      throw new Error("401");
    }
  }
  if (process.env.NODE_ENV === "production") throw new Error("503");
  return "dev";
}

/** Asks the AI model; null when no key is set or the call fails (the FAQ answers instead). */
async function askModel(messages: Msg[], page: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        system: `${SYSTEM_PROMPT}\n\nL'étudiant se trouve sur la page : ${page || "inconnue"}`,
        messages,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      console.error("Assistant model refused:", response.status, (await response.text()).slice(0, 300));
      return null;
    }
    const data = await response.json();
    const text = (data.content || []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n").trim();
    return text || null;
  } catch (error) {
    console.error("Assistant model failed:", error);
    return null;
  }
}

/** The student's question and the conversation so far: { messages: [{ role, content }], page? }. */
export async function POST(request: Request) {
  try {
    const uid = await who(request);
    const now = Date.now();
    const recent = (hits.get(uid) || []).filter((t) => now - t < 600_000);
    if (recent.length >= LIMIT) return NextResponse.json({ error: "Vous avez posé beaucoup de questions. Réessayez dans quelques minutes." }, { status: 429 });
    hits.set(uid, [...recent, now]);
    if (hits.size > 5000) hits.clear();

    const b = await request.json().catch(() => ({}));
    const raw: Msg[] = Array.isArray(b.messages) ? b.messages : [];
    const messages = raw
      .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
      .slice(-KEEP);
    // The model needs a conversation that starts and ends with the student.
    while (messages.length && messages[0].role !== "user") messages.shift();
    if (!messages.length || messages[messages.length - 1].role !== "user") return NextResponse.json({ error: "Posez votre question." }, { status: 400 });

    const page = String(b.page || "").slice(0, 120);
    const ai = await askModel(messages, page);
    if (ai) return NextResponse.json({ reply: ai, source: "ai" });
    return NextResponse.json({ reply: faqAnswer(messages[messages.length - 1].content) || FALLBACK, source: "faq" });
  } catch (error) {
    const code = (error as Error).message;
    if (code === "401") return NextResponse.json({ error: "Connectez-vous pour utiliser l'assistant." }, { status: 401 });
    if (code === "503") return NextResponse.json({ error: "Assistant indisponible." }, { status: 503 });
    console.error("Assistant failed:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
