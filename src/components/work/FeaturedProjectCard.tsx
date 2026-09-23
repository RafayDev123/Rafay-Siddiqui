import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <Reveal className="group border-t border-[var(--border)] py-12 first:border-t-0 first:pt-0 sm:py-16">
      <Link
        to={`/work/${project.slug}`}
        data-cursor="hover"
        className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
      >
        <div className={reversed ? "lg:order-2" : ""}>
          <ProjectVisual
            project={project}
            className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border)] transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:aspect-[16/10]"
          />
        </div>

        <div className={reversed ? "lg:order-1" : ""}>
          <span className="font-mono text-xs text-[var(--text-faint)]">
            {String(index + 1).padStart(2, "0")} — {project.category}
          </span>
          <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--text-muted)]">
            {project.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.technologies.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[11px] text-[var(--text-muted)]"
              >
                {t}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)]">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
