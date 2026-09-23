import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    index: "01",
    title: "Interfaces from Figma",
    body: "Design files turned into pixel-accurate, responsive pages that hold together across breakpoints, not just the 1440px frame.",
  },
  {
    index: "02",
    title: "React & Next.js apps",
    body: "Component-driven frontends with TypeScript, built to be readable and easy to extend, not just to ship once.",
  },
  {
    index: "03",
    title: "Dashboards & tools",
    body: "Data-heavy screens where layout, hierarchy and responsiveness decide whether the tool is actually usable.",
  },
  {
    index: "04",
    title: "AI-assisted builds",
    body: "Using generative AI tooling and agents to prototype faster, then finishing the implementation to a production standard.",
  },
];

export function WhatIBuild() {
  return (
    <section className="border-b border-[var(--border)] py-24 sm:py-28" aria-label="What I build">
      <Container>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">What I build</p>
          <h2 className="text-balance mt-4 max-w-2xl font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.15] text-[var(--text)]">
            Most of the interesting frontend problems start after the design looks finished.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.06}>
              <span className="font-mono text-sm text-[var(--text-faint)]">{item.index}</span>
              <h3 className="mt-4 font-display text-lg font-medium text-[var(--text)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
