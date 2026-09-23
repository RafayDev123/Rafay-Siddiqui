import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useMotionPreference } from "@/lib/MotionPreferenceContext";

const lines = [
  { prompt: "$ whoami", output: "rafay siddiqui, frontend developer" },
  { prompt: "$ focus --list", output: '["react", "next.js", "typescript", "ai-assisted development"]' },
  { prompt: "$ ai --capabilities", output: "generative tooling · ai agents · chatbot development · rapid prototyping" },
  { prompt: "$ status", output: "building." },
];

export function AIFocus() {
  const termRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-term-row]");
      if (reduced) {
        gsap.set(rows, { opacity: 1 });
        return;
      }
      gsap.set(rows, { opacity: 0 });
      gsap.to(rows, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.35,
        ease: "none",
        scrollTrigger: { trigger: termRef.current, start: "top 75%", once: true },
      });
    },
    { scope: termRef, dependencies: [reduced] }
  );

  return (
    <section className="border-b border-[var(--border)] py-24 sm:py-28" aria-label="AI-powered development">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="AI-powered development"
              title="AI is part of how I build now, not a side project."
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--text-muted)]">
              <Reveal as="div">
                <p>
                  I use generative AI tools and AI-assisted coding as part of my regular workflow, for
                  scaffolding, exploring approaches faster, and speeding up the distance between an idea and a
                  working build.
                </p>
              </Reveal>
              <Reveal as="div" delay={0.08}>
                <p>
                  That extends into building with AI directly: chatbot interfaces and AI agents as product
                  features, not just using AI as an autocomplete tool.
                </p>
              </Reveal>
              <Reveal as="div" delay={0.16}>
                <p>This is an active, ongoing direction in how I work, applied alongside solid frontend fundamentals, not instead of them.</p>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <div
              ref={termRef}
              className="overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[#0d0d10] shadow-2xl"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-[11px] text-white/40">rafay@frontend ~ %</span>
              </div>
              <div className="space-y-4 p-6 font-mono text-[13px] leading-relaxed">
                {lines.map((line) => (
                  <div key={line.prompt} data-term-row>
                    <p className="text-[#7dd3fc]">{line.prompt}</p>
                    <p className="mt-1 text-white/70">{line.output}</p>
                  </div>
                ))}
                <div data-term-row className="flex items-center gap-1 text-white/70">
                  <span>$</span>
                  <span className="h-4 w-2 animate-pulse bg-white/50 motion-reduce:animate-none" aria-hidden="true" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
