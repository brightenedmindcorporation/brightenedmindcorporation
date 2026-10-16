"use client";

import { useEffect, useRef } from "react";
import { VideoMeter, type TrackedType } from "@/lib/trackEvent";

/** A <video> with controls that reports plays, time watched and drop-off (anonymously). */
export default function TrackedVideo({
  src,
  type,
  statsKey,
  title,
  className,
}: {
  src: string;
  type: TrackedType;
  statsKey: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const meter = useRef<VideoMeter | null>(null);

  useEffect(() => {
    const m = new VideoMeter(type, statsKey, title);
    meter.current = m;
    const leave = () => m.flush(true);
    window.addEventListener("pagehide", leave);
    return () => {
      window.removeEventListener("pagehide", leave);
      leave();
    };
  }, [type, statsKey, title]);

  const sample = () => {
    const v = ref.current;
    if (v && meter.current) meter.current.tick(v.currentTime, v.duration || 0);
  };

  return (
    <video
      ref={ref}
      src={src}
      controls
      className={className}
      onPlay={() => meter.current?.start()}
      onTimeUpdate={sample}
      onPause={() => {
        sample();
        meter.current?.flush();
      }}
      onEnded={() => {
        sample();
        meter.current?.finish();
      }}
    />
  );
}
