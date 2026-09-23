import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/site";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 border-b border-[var(--border)] py-24 sm:py-28" aria-label="Experience">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where the frontend day-to-day happens."
          description="One role, still going. The details are what actually fill the days."
        />

        <ol className="mt-14 space-y-0">
          {experience.map((job) => (
            <Reveal key={job.company} as="li">
              <div className="grid gap-6 border-t border-[var(--border)] py-10 lg:grid-cols-[240px_1fr]">
                <div>
                  <p className="font-display text-xl font-medium text-[var(--text)]">{job.company}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{job.role}</p>
                  <p className="mt-3 font-mono text-xs text-[var(--text-faint)]">{job.period}</p>
                  <p className="font-mono text-xs text-[var(--text-faint)]">{job.location}</p>
                </div>
                <div>
                  <p className="max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)]">{job.summary}</p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
