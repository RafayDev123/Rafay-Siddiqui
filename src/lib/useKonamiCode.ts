import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Tasteful, optional Easter egg — never required to access real content. */
export function useKonamiCode() {
  const [triggered, setTriggered] = useState(false);
  const progress = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase?.() ?? "";
      const expected = (SEQUENCE[progress.current] ?? "").toLowerCase();

      if (!key) return;

      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          setTriggered(true);
          progress.current = 0;
          window.setTimeout(() => setTriggered(false), 4000);
        }
      } else {
        progress.current = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return triggered;
}
