"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getLiveRoomName, getJaasAppId, isJitsiConfigured } from "@/lib/academy/liveRooms";
import { fetchLiveSession } from "@/lib/academy/fetchLiveSession";
import { logActivity } from "@/lib/academy/activity";
import { isSessionJoinable, isSessionOpenNow, type LiveSession } from "@/lib/academy/liveSessions";
import JitsiEmbed from "@/components/academy/JitsiEmbed";

const POLL_MS = 5000;

/**
 * Student side of a live class. Students wait in a waiting room until the
 * teacher presses "Ouvrir le cours"; the page polls the session status and
 * switches to the video room automatically (and back to an "ended" screen
 * if the teacher closes it). The server also refuses to issue a video token
 * while the room is closed, so this isn't just a UI gate.
 */
export default function StudentLiveRoom({
  langCode,
  level,
  studentName,
}: {
  langCode: string;
  level: number;
  studentName: string;
}) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [checked, setChecked] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [wasOpen, setWasOpen] = useState(false);
  const fetchingToken = useRef(false);

  // Poll the session (status + open flag).
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        // Only the classes of this student's own teacher come back.
        const found = await fetchLiveSession(langCode, level);
        if (!cancelled) setSession(found);
      } catch {
        // keep the last known state; try again on the next tick
      } finally {
        if (!cancelled) setChecked(true);
      }
    };
    load();
    const interval = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [langCode, level]);

  const roomOpen = session ? isSessionOpenNow(session) : false;
  const canWait = session ? isSessionJoinable(session) || roomOpen : false;

  // When the teacher opens the room, fetch a (non-moderator) token.
  useEffect(() => {
    if (roomOpen) {
      setWasOpen(true);
      if (token || fetchingToken.current) return;
      fetchingToken.current = true;
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) return;
        unsubscribe();
        try {
          const idToken = await user.getIdToken();
          const response = await fetch("/api/academy/live-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken, langCode, level, sessionId: session?.id }),
          });
          const result = await response.json();
          if (!response.ok) {
            // "not-open" can briefly happen right at the switch: just retry on the next poll.
            if (result.code === "not-open") {
              fetchingToken.current = false;
              return;
            }
            throw new Error(result.error || "Erreur serveur");
          }
          setTokenError(null);
          setToken(result.token);
          logActivity("live_join", `A rejoint le cours en direct${session?.title ? ` « ${session.title} »` : ""} (${langCode}, niveau ${level})`, { langCode, level });
        } catch (error: any) {
          setTokenError(error.message || "Erreur serveur.");
          fetchingToken.current = false;
        }
      });
    } else {
      // Room closed (or never opened): drop the token so the video unmounts.
      fetchingToken.current = false;
      if (token) setToken(null);
    }
  }, [roomOpen, token, langCode, level, session]);

  const appId = getJaasAppId();

  if (!checked) {
    return (
      <div className="bg-surface rounded-3xl p-10 border border-line text-center">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-surface rounded-3xl p-10 border border-line text-center space-y-3">
        <p className="text-xl font-bold text-ink">Aucun cours en direct programmé</p>
        <p className="text-ink-soft text-sm max-w-md mx-auto">
          {wasOpen
            ? "Le cours est terminé. Merci de votre participation !"
            : "Aucune session n'est actuellement programmée pour ce niveau. Consultez votre tableau de bord régulièrement, ou contactez l'administration pour connaître le prochain horaire."}
        </p>
      </div>
    );
  }

  if (!canWait) {
    return (
      <div className="bg-surface rounded-3xl p-10 border border-line text-center space-y-3">
        <p className="text-xl font-bold text-ink">Le cours n'a pas encore commencé</p>
        <p className="text-ink-soft text-sm max-w-md mx-auto">
          Prochaine session {session.title ? `« ${session.title} » ` : ""}:{" "}
          <span className="text-red-500 font-semibold">
            {new Date(session.scheduledAt).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })}
          </span>
          <br />
          La salle d'attente s'ouvre 10 minutes avant le début.
        </p>
      </div>
    );
  }

  if (!roomOpen) {
    // Waiting room — the teacher has not opened the class yet.
    return (
      <div className="bg-surface rounded-3xl p-10 md:p-14 border border-line text-center space-y-5">
        {wasOpen ? (
          <>
            <p className="text-2xl font-black text-ink">Le cours est terminé</p>
            <p className="text-ink-soft text-sm max-w-md mx-auto">
              L'enseignant a clôturé la session. Merci de votre participation ! Si le cours reprend, cette page
              vous y ramènera automatiquement.
            </p>
          </>
        ) : (
          <>
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500/20 animate-ping" />
              <span className="relative inline-flex h-10 w-10 rounded-full bg-red-600" />
            </div>
            <p className="text-2xl font-black text-ink">Salle d'attente</p>
            <p className="text-ink-soft text-sm max-w-md mx-auto">
              Votre enseignant n'a pas encore ouvert la classe
              {session.title ? ` « ${session.title} »` : ""}. Restez sur cette page : le cours démarrera
              automatiquement dès qu'il l'ouvrira — aucun besoin de recharger.
            </p>
            <div className="max-w-sm mx-auto text-left text-xs text-ink-soft bg-surface-alt border border-line rounded-2xl p-4 space-y-1.5">
              <p className="font-bold text-ink">En attendant :</p>
              <p>• Vérifiez que votre micro et votre caméra fonctionnent.</p>
              <p>• Autorisez-les quand le navigateur vous le demande.</p>
              <p>• Utilisez Chrome ou Edge, avec une connexion stable.</p>
            </div>
          </>
        )}
      </div>
    );
  }

  // Room open.
  if (tokenError) {
    return (
      <div className="bg-surface rounded-3xl p-10 border border-line text-center space-y-3">
        <p className="text-xl font-bold text-ink">{tokenError}</p>
      </div>
    );
  }

  if (isJitsiConfigured() && appId && token) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          Le cours est en cours — vous pouvez lever la main et écrire dans le chat.
        </div>
        <JitsiEmbed
          appId={appId}
          roomName={getLiveRoomName(langCode, level, session?.id)}
          displayName={studentName}
          jwt={token}
          role="student"
        />
      </div>
    );
  }

  if (isJitsiConfigured() && appId) {
    return (
      <div className="bg-surface rounded-3xl p-10 border border-line text-center space-y-3">
        <p className="text-xl font-bold text-ink">Le cours vient d'ouvrir — connexion à la salle…</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-3xl p-10 border border-line text-center space-y-3">
      <p className="text-xl font-bold text-ink">Classes en direct bientôt disponibles</p>
      <p className="text-ink-soft text-sm max-w-md mx-auto">
        Cette fonctionnalité sera activée dès que l'administration aura configuré le service de visioconférence.
      </p>
    </div>
  );
}
