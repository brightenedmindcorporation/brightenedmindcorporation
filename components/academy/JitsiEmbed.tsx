"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (domain: string, options: Record<string, unknown>) => {
      dispose: () => void;
    };
  }
}

// Students get the tools a learner needs (mic, camera, chat, raise hand,
// participants, layout) — no screen sharing, recording or room security.
const STUDENT_TOOLBAR = [
  "microphone",
  "camera",
  "raisehand",
  "chat",
  "participants-pane",
  "tileview",
  "fullscreen",
  "settings",
  "hangup",
];

export default function JitsiEmbed({
  appId,
  roomName,
  displayName,
  jwt,
  role = "student",
}: {
  appId: string;
  roomName: string;
  displayName: string;
  /** Signed JaaS token carrying the moderator claim — without it, JaaS
   * falls back to granting moderator to whoever joins the room first. */
  jwt?: string;
  role?: "teacher" | "student";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let api: { dispose: () => void } | null = null;
    let script: HTMLScriptElement | null = null;

    function mount() {
      if (!containerRef.current || !window.JitsiMeetExternalAPI) return;
      try {
        api = new window.JitsiMeetExternalAPI("8x8.vc", {
          roomName: `${appId}/${roomName}`,
          jwt,
          parentNode: containerRef.current,
          userInfo: { displayName },
          width: "100%",
          height: "100%",
          configOverwrite: {
            prejoinPageEnabled: false,
            prejoinConfig: { enabled: false },
            defaultLanguage: "fr",
            disableInviteFunctions: true,
            ...(role === "student"
              ? { startWithAudioMuted: true, toolbarButtons: STUDENT_TOOLBAR, disableRemoteMute: true }
              : {}),
          },
        });
      } catch (err) {
        console.error("Jitsi init error:", err);
        setError("Impossible de démarrer la classe en direct.");
      }
    }

    if (window.JitsiMeetExternalAPI) {
      mount();
    } else {
      script = document.createElement("script");
      script.src = "https://8x8.vc/external_api.js";
      script.async = true;
      script.onload = mount;
      script.onerror = () => setError("Impossible de charger le service de visioconférence.");
      document.body.appendChild(script);
    }

    return () => {
      api?.dispose();
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [appId, roomName, displayName, jwt, role]);

  if (error) {
    return (
      <div className="w-full h-[70vh] min-h-[480px] flex items-center justify-center bg-surface-sunken text-red-400 rounded-2xl border border-line">
        {error}
      </div>
    );
  }

  // The iframe is sized at 100% of this box, so the box needs a real height
  // (a bare h-full collapses to the iframe's tiny default).
  return (
    <div
      ref={containerRef}
      className="w-full h-[75vh] min-h-[520px] max-h-[820px] rounded-2xl overflow-hidden border border-line bg-black"
    />
  );
}
