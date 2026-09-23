import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectVisual } from "@/components/work/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { useDocumentMeta } from "@/lib/useDocumentMeta";

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useDocumentMeta({
    title: project ? `${project.title} — Rafay Siddiqui` : "Project — Rafay Siddiqui",
    description: project?.description ?? "Project case study by Rafay Siddiqui.",
    path: `/work/${slug ?? ""}`,
  });

  if (!project) return <Navigate to="/work" replace />;

  const { next, previous } = getAdjacentProjects(project.slug);

  return (
    <main id="main" className="pt-8">
      <Container className="pb-10">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-muted)]">
            {project.category}
          </span>
          {project.confidential && (
            <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-faint)]">
              Private client project
            </span>
          )}
        </div>

        <h1 className="text-balance mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4rem)] font-medium leading-[1.05] text-[var(--text)]">
          {project.title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)]">{project.tagline}</p>
      </Container>

      <Container className="pb-16">
        <Reveal>
          <ProjectVisual
            project={project}
            className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border)] sm:aspect-[21/9]"
          />
        </Reveal>
      </Container>

      <Container className="grid gap-14 pb-24 lg:grid-cols-[1fr_280px] lg:gap-20">
        <div className="space-y-12">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Overview</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)]">
              {project.description}
            </p>
          </Reveal>

          {project.features && project.features.length > 0 && (
            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Key features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">Responsive behavior</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--text-muted)]">
              Built mobile-first and verified across breakpoints so layout, type and touch targets hold up from
              small phones through desktop.
            </p>
          </Reveal>
        </div>

        <aside className="space-y-8 lg:border-l lg:border-[var(--border)] lg:pl-10">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]">Role</p>
            <p className="mt-2 text-sm text-[var(--text)]">{project.role ?? "Frontend Developer"}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]">Technology</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-muted)]">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
          {(project.liveUrl || project.githubUrl) && (
            <Reveal delay={0.12}>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]">Links</p>
              <div className="mt-2 space-y-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline">
                    Live demo <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline">
                    Source code <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </aside>
      </Container>

      <nav className="border-t border-[var(--border)] py-14" aria-label="Project navigation">
        <Container className="flex flex-col justify-between gap-8 sm:flex-row">
          <Link to={`/work/${previous.slug}`} className="group max-w-xs">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]">Previous</span>
            <p className="mt-2 flex items-center gap-2 font-display text-lg text-[var(--text)] group-hover:text-[var(--accent)]">
              <ArrowLeft className="h-4 w-4" aria-hidden /> {previous.title}
            </p>
          </Link>
          <Link to={`/work/${next.slug}`} className="group max-w-xs text-right sm:ml-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]">Next</span>
            <p className="mt-2 flex items-center justify-end gap-2 font-display text-lg text-[var(--text)] group-hover:text-[var(--accent)]">
              {next.title} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </p>
          </Link>
        </Container>
      </nav>
    </main>
  );
}
