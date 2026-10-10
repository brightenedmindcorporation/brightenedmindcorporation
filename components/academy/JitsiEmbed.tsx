"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (domain: string, options: Record<string, unknown>) => {
      dispose: () => void;
    };
  }
}

export default function JitsiEmbed({
  appId,
  roomName,
  displayName,
  jwt,
}: {
  appId: string;
  roomName: string;
  displayName: string;
  /** Signed JaaS token carrying the moderator claim — without it, JaaS
   * falls back to granting moderator to whoever joins the room first. */
  jwt?: string;
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
          configOverwrite: { prejoinPageEnabled: false },
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
      if (script) document.body.removeChild(script);
    };
  }, [appId, roomName, displayName, jwt]);

  if (error) {
    return (
      <div className="w-full h-full min-h-[480px] flex items-center justify-center bg-surface-sunken text-red-400 rounded-2xl border border-line">
        {error}
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full min-h-[480px] rounded-2xl overflow-hidden border border-line" />;
}
