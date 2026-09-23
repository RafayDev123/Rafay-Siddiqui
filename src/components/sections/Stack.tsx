import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { skillCategories } from "@/data/site";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-16 border-b border-[var(--border)] py-24 sm:py-28" aria-label="Technology stack">
      <Container>
        <SectionHeading
          eyebrow="Current focus"
          title="What I'm building with."
          description="The core toolkit, plus the AI-assisted layer that increasingly sits alongside it."
        />

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={(i % 3) * 0.06}>
              <h3 className="font-display text-base font-medium text-[var(--text)]">{category.title}</h3>
              <p className="mt-1.5 text-sm text-[var(--text-faint)]">{category.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--border)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
