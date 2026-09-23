import { useEffect, useState } from "react";
import { useMotionPreference } from "@/lib/MotionPreferenceContext";

/** Fast, minimal preloader. Skips itself immediately for reduced-motion users. */
export function Preloader() {
  const { reduced } = useMotionPreference();
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(reduced);
  const [mounted, setMounted] = useState(!reduced);

  useEffect(() => {
    if (reduced) return;
    let raf: number;
    const start = performance.now();
    const duration = 700;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setHidden(true), 180);
        setTimeout(() => setMounted(false), 620);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress}%`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)] transition-opacity duration-500"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-5">
        <span className="font-display text-2xl tracking-[0.15em] text-[var(--text)]">RS</span>
        <div className="h-px w-40 overflow-hidden bg-[var(--border)]">
          <div
            className="h-full bg-[var(--accent)] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-xs text-[var(--text-faint)]">{progress}%</span>
      </div>
    </div>
  );
}
