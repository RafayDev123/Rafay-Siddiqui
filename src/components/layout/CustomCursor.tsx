import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { useMotionPreference } from "@/lib/MotionPreferenceContext";

/** Subtle desktop-only cursor. Never rendered on touch devices, and no-ops under reduced motion. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(canHover);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const quickDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const quickRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const quickRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      quickDot(e.clientX);
      quickDotY(e.clientY);
      quickRing(e.clientX);
      quickRingY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setActive(!!target.closest("a, button, [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-2)]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,border-color,opacity] duration-200"
        style={{
          width: active ? 44 : 28,
          height: active ? 44 : 28,
          borderColor: active ? "var(--accent)" : "var(--border-strong)",
          opacity: active ? 1 : 0.7,
        }}
      />
    </>
  );
}
