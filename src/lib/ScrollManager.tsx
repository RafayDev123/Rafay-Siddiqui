import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top of the page on route changes (e.g. Home -> /work).
 * In-page section navigation is handled separately by `useSectionNav`,
 * since HashRouter reserves the URL hash for routing.
 */
export function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
