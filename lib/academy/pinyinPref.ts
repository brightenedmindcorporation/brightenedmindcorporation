"use client";

import { useSyncExternalStore } from "react";

// Whether the pinyin is shown above Chinese characters; the student's choice is remembered on this device.
const KEY = "bm-pinyin";
const listeners = new Set<() => void>();

const read = () => {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
};

export function setPinyin(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // storage blocked: the choice only lasts until the page is closed
  }
  listeners.forEach((l) => l());
}

export function usePinyin(): boolean {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      window.addEventListener("storage", listener);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
      };
    },
    read,
    () => true
  );
}
