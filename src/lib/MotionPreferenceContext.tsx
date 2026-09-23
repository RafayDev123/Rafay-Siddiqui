import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

type MotionContextValue = {
  /** True when animation should be minimized (system preference OR user override). */
  reduced: boolean;
  userOverride: boolean | null;
  setUserOverride: (value: boolean | null) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion();
  const [userOverride, setUserOverrideState] = useState<boolean | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = window.localStorage.getItem("motion-preference");
    if (stored === "reduced") return true;
    if (stored === "full") return false;
    return null;
  });

  const setUserOverride = (value: boolean | null) => {
    setUserOverrideState(value);
    if (value === null) window.localStorage.removeItem("motion-preference");
    else window.localStorage.setItem("motion-preference", value ? "reduced" : "full");
  };

  const reduced = userOverride ?? systemReduced;

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  const value = useMemo(
    () => ({ reduced, userOverride, setUserOverride }),
    [reduced, userOverride]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionPreference() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotionPreference must be used within MotionProvider");
  return ctx;
}
