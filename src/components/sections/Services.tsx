import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/site";
import { useSectionNav } from "@/lib/useSectionNav";

export function Services() {
  const goToSection = useSectionNav();
  return (
    <section className="border-b border-[var(--border)] py-24 sm:py-28" aria-label="How I work">
      <Container>
        <SectionHeading
          eyebrow="How I work"
          title="Three ways I can help build the thing."
            description="Contextual capabilities, not a menu of buzzwords. This is the actual shape of the work I take on."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08} className="bg-[var(--bg)] p-8">
              <span className="font-mono text-xs text-[var(--text-faint)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-lg font-medium text-[var(--text)]">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-sm text-[var(--text-muted)]">
            Have a project like this in mind?{" "}
            <button onClick={() => goToSection("contact")} className="font-medium text-[var(--accent)] hover:underline">
              Let's talk about the build.
            </button>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
