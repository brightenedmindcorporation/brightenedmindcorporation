"use client";

import { useEffect, type RefObject } from "react";
import { VideoMeter, type TrackedType } from "@/lib/trackEvent";

interface YTPlayer {
  getCurrentTime(): number;
  getDuration(): number;
  destroy(): void;
}
interface YTApi {
  Player: new (
    el: HTMLIFrameElement,
    opts: { events: { onStateChange: (e: { data: number }) => void; onError?: (e: { data: number }) => void } }
  ) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTApi> | null = null;
function loadYouTubeApi(): Promise<YTApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT?.Player) resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("YouTube API unavailable"));
    document.head.appendChild(script);
  });
  return apiPromise;
}

/**
 * Counts plays, watched time and drop-off of a YouTube embed (the iframe must carry enablejsapi=1).
 * Statistics are best-effort: if the YouTube API cannot load, the video simply is not measured.
 */
export function useYouTubeMeter(
  iframe: RefObject<HTMLIFrameElement | null>,
  type: TrackedType,
  key: string,
  title: string,
  enabled: boolean,
  /** Called when YouTube cannot play the video (removed, private, embedding disabled, region…). */
  onError?: () => void
) {
  useEffect(() => {
    const el = iframe.current;
    if (!enabled || !el) return;
    let player: YTPlayer | null = null;
    let timer: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;
    const meter = new VideoMeter(type, key, title);

    const sample = () => {
      try {
        if (player) meter.tick(player.getCurrentTime(), player.getDuration());
      } catch {
        // player not ready yet
      }
    };
    const stopTimer = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const leave = () => {
      sample();
      meter.flush(true);
    };

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        player = new YT.Player(el, {
          events: {
            onError: () => onError?.(),
            onStateChange: (e) => {
              if (e.data === 1) {
                meter.start();
                stopTimer();
                timer = setInterval(sample, 1000);
              } else if (e.data === 0) {
                stopTimer();
                sample();
                meter.finish();
              } else if (e.data === 2) {
                stopTimer();
                sample();
                meter.flush();
              }
            },
          },
        });
      })
      .catch(() => {});

    window.addEventListener("pagehide", leave);
    return () => {
      cancelled = true;
      window.removeEventListener("pagehide", leave);
      stopTimer();
      leave();
    };
  }, [iframe, type, key, title, enabled]);
}
