import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import gsap from "@/lib/gsap";
import { useMotionPreference } from "@/lib/MotionPreferenceContext";

/**
 * Editorial index-style row for the full work listing. Essential information
 * (title, category, stack) is always visible; hover only adds a floating
 * preview on devices with a precise pointer.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLLIElement>(null);
  const [hovered, setHovered] = useState(false);
  const { reduced } = useMotionPreference();

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !previewRef.current) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    gsap.to(previewRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <li
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className="group relative border-b border-[var(--border)] first:border-t"
    >
      <Link
        to={`/work/${project.slug}`}
        data-cursor="hover"
        className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-sm text-[var(--text-faint)]">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-display text-xl font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)] sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-faint)]">{project.category}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pl-9 sm:pl-0">
          <div className="hidden flex-wrap gap-2 md:flex">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[11px] text-[var(--text-faint)]">
                {t}
              </span>
            ))}
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-[var(--text-faint)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent)]"
            aria-hidden
          />
        </div>
      </Link>

      {/* Desktop-only floating preview; decorative, never the sole source of info. */}
      <div
        ref={previewRef}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden w-56 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 lg:block"
        style={{ opacity: hovered ? 1 : 0 }}
        aria-hidden="true"
      >
        <ProjectVisual project={project} className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--border-strong)] shadow-2xl" />
      </div>
    </li>
  );
}
