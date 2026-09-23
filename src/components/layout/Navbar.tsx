import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useTheme } from "@/lib/ThemeContext";
import { useSectionNav } from "@/lib/useSectionNav";
import { cn } from "@/utils/cn";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const goToSection = useSectionNav();
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone/.test(navigator.userAgent);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Simple scroll-spy for in-page section links on the homepage.
  useEffect(() => {
    if (location.pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    siteConfig.nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="font-display text-lg font-medium tracking-tight text-[var(--text)]"
            aria-label="Rafay Siddiqui — home"
          >
            RS<span className="text-[var(--accent)]">.</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {siteConfig.nav.map((item) => {
              const isActive = location.pathname === "/" && activeId === item.id;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => goToSection(item.id)}
                    className={cn(
                      "relative py-1 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]",
                      "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full",
                      isActive && "text-[var(--text)] after:w-full"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={onOpenPalette}
              className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 font-mono text-xs text-[var(--text-faint)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" aria-hidden />
              {isMac ? "⌘K" : "Ctrl K"}
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
            </button>
            <button
              onClick={() => goToSection("contact")}
              className="rounded-full bg-[var(--text)] px-4 py-2 text-sm font-medium text-[var(--bg)] transition-colors hover:bg-[var(--accent)] hover:text-white"
            >
              Let's talk
            </button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[70] flex flex-col bg-[var(--bg)] md:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-lg text-[var(--text)]">
              RS<span className="text-[var(--accent)]">.</span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    goToSection(item.id);
                    setMobileOpen(false);
                  }}
                  className="block py-3 text-left font-display text-sm text-[var(--text)] transition-colors hover:text-[var(--accent)] min-[400px]:text-base min-[640px]:text-lg"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="pt-6">
              <Link
                to="/work"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] underline underline-offset-4"
              >
                View all work
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-6">
            <button
              onClick={() => {
                onOpenPalette();
                setMobileOpen(false);
              }}
              className="font-mono text-xs text-[var(--text-faint)]"
            >
              ⌘K Command menu
            </button>
            <button
              onClick={() => toggleTheme()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
            </button>
          </div>
        </div>
      )}

      {/* Spacer to prevent hero from sitting under the fixed header on load. */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
