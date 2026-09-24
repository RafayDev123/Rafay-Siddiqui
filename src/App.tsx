import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/lib/ThemeContext";
import { MotionProvider } from "@/lib/MotionPreferenceContext";
import { ScrollManager } from "@/lib/ScrollManager";
import { useKonamiCode } from "@/lib/useKonamiCode";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { CommandPalette } from "@/components/layout/CommandPalette";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import WorkDetail from "@/pages/WorkDetail";
import NotFound from "@/pages/NotFound";

function AppShell() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const konami = useKonamiCode();
  const location = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase?.() ?? "";
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // A small, professional console signature — personality without noise.
    // eslint-disable-next-line no-console
    console.log(
      "%cRafay Siddiqui %c— Frontend Developer\nBuilt with React, TypeScript, Tailwind CSS & GSAP.\nTry the Konami code, or press ⌘K / Ctrl+K.",
      "font-size:14px;font-weight:700;color:#6f6bfb;",
      "font-size:12px;color:#9a9aa5;",
    );
  }, []);

  // Only render 404 chrome-free (no header/footer around a shell that already includes them).
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <button
        onClick={() => {
          const main = document.getElementById("main");
          if (main) {
            main.setAttribute("tabindex", "-1");
            main.focus();
            main.scrollIntoView({ block: "start" });
          }
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </button>

      <Preloader />
      <ScrollProgress />
      <ScrollManager />
      <CustomCursor />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />

      {konami && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-[var(--accent)] bg-[var(--bg-elevated)] px-5 py-2.5 font-mono text-xs text-[var(--text)] shadow-2xl"
        >
          🎮 Konami code accepted — you found the Easter egg.
        </div>
      )}

      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionProvider>
        <AppShell />
      </MotionProvider>
    </ThemeProvider>
  );
}
