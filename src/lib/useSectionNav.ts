import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMotionPreference } from "./MotionPreferenceContext";

/**
 * Navigates to an in-page section (`#work`, `#contact`, etc.) without relying
 * on native `href="#..."` anchors — those would collide with HashRouter's own
 * use of the URL hash for routing. On the homepage this just scrolls; from
 * any other route it navigates home first and scrolls once it has rendered.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { reduced } = useMotionPreference();

  return useCallback(
    (sectionId: string) => {
      if (location.pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      } else {
        navigate(`/?section=${sectionId}`);
      }
    },
    [location.pathname, navigate, reduced]
  );
}
