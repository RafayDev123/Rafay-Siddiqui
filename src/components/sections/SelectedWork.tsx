import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FeaturedProjectCard } from "@/components/work/FeaturedProjectCard";
import { featuredProjects } from "@/data/projects";

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-16 border-b border-[var(--border)] py-24 sm:py-28" aria-label="Selected work">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Real projects, built end to end."
            description="A handful of the frontend projects I've shipped, from a live news reader to marketing and dashboard builds."
          />
          <Reveal>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14">
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
