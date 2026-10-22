"use client";

import { useEffect, useState } from "react";

const KEY = "bm-show-french";
const EVENT = "bm-french-changed";

/** Whether the French translation under the English lines is shown (remembered on this device). */
export function useFrenchVisible(): [boolean, (v: boolean) => void] {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const read = () => {
      try {
        setVisible(localStorage.getItem(KEY) !== "0");
      } catch {
        // storage unavailable: stay on
      }
    };
    read();
    window.addEventListener(EVENT, read);
    return () => window.removeEventListener(EVENT, read);
  }, []);
  const set = (v: boolean) => {
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      // ignore
    }
    setVisible(v);
    window.dispatchEvent(new Event(EVENT));
  };
  return [visible, set];
}
