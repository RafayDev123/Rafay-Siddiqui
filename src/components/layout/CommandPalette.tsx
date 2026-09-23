import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Mail, Moon, Sparkles, ArrowUp, Search } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";
import { useTheme } from "@/lib/ThemeContext";
import { useMotionPreference } from "@/lib/MotionPreferenceContext";
import { useSectionNav } from "@/lib/useSectionNav";

type Command = {
  id: string;
  label: string;
  group: "Navigate" | "Links" | "Preferences";
  hint?: string;
  icon?: React.ReactNode;
  run: () => void;
  keywords?: string;
};

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { reduced, setUserOverride, userOverride } = useMotionPreference();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const goToSection = useSectionNav();

  const commands: Command[] = useMemo(
    () => [
      { id: "home", label: "Go Home", group: "Navigate", run: () => navigate("/") },
      { id: "work", label: "View Work", group: "Navigate", run: () => navigate("/work") },
      { id: "about", label: "About Me", group: "Navigate", run: () => goToSection("about") },
      { id: "experience", label: "Experience", group: "Navigate", run: () => goToSection("experience") },
      { id: "stack", label: "Tech Stack", group: "Navigate", run: () => goToSection("stack") },
      { id: "contact", label: "Contact", group: "Navigate", run: () => goToSection("contact") },
      { id: "top", label: "Scroll to Top", group: "Navigate", icon: <ArrowUp className="h-4 w-4" aria-hidden />, run: () => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }) },
      {
        id: "github",
        label: "Open GitHub",
        group: "Links",
        icon: <GitHubIcon className="h-4 w-4" />,
        run: () => window.open(siteConfig.social.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Links",
        icon: <LinkedInIcon className="h-4 w-4" />,
        run: () => window.open(siteConfig.social.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "resume",
        label: siteConfig.resumeUrl ? "Download Resume" : "Request Resume via Email",
        group: "Links",
        icon: <ArrowUpRight className="h-4 w-4" aria-hidden />,
        run: () =>
          siteConfig.resumeUrl
            ? window.open(siteConfig.resumeUrl, "_blank")
            : (window.location.href = `mailto:${siteConfig.email}?subject=Resume%20Request`),
      },
      {
        id: "email",
        label: "Send an Email",
        group: "Links",
        icon: <Mail className="h-4 w-4" aria-hidden />,
        run: () => (window.location.href = siteConfig.social.email),
      },
      {
        id: "theme",
        label: `Toggle Theme (currently ${theme})`,
        group: "Preferences",
        icon: <Moon className="h-4 w-4" aria-hidden />,
        run: toggleTheme,
      },
      {
        id: "motion",
        label: userOverride === true ? "Enable Full Motion" : "Reduce Motion",
        group: "Preferences",
        icon: <Sparkles className="h-4 w-4" aria-hidden />,
        run: () => setUserOverride(userOverride === true ? false : true),
      },
    ],
    [navigate, reduced, theme, toggleTheme, userOverride, setUserOverride, goToSection]
  );

  const filtered = commands.filter((c) =>
    (c.label + " " + (c.keywords ?? "")).toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIndex];
        if (cmd) {
          cmd.run();
          onClose();
        }
      } else if (e.key === "Tab") {
        // simple focus trap within the panel
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>("input, button");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  const groups = ["Navigate", "Links", "Preferences"] as const;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--text-faint)]" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            aria-label="Command search"
            className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
          />
          <kbd className="font-mono text-[10px] text-[var(--text-faint)]">ESC</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-[var(--text-faint)]">No matching commands.</p>
          )}
          {groups.map((group) => {
            const items = filtered.filter((c) => c.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="px-2 py-1">
                <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--text-faint)]">
                  {group}
                </p>
                {items.map((cmd) => {
                  const globalIndex = filtered.indexOf(cmd);
                  const isActive = globalIndex === activeIndex;
                  return (
                    <button
                      key={cmd.id}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      onClick={() => {
                        cmd.run();
                        onClose();
                      }}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-[var(--surface-hover)] text-[var(--text)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {cmd.icon}
                      <span>{cmd.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
