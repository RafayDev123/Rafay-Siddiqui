import { Link } from "react-router-dom";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { useSectionNav } from "@/lib/useSectionNav";

export function Footer() {
  const goToSection = useSectionNav();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-[var(--text)]">
              {siteConfig.name}
              <span className="text-[var(--accent)]">.</span>
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{siteConfig.role}</p>
            <p className="mt-6 max-w-xs text-balance text-sm leading-relaxed text-[var(--text-faint)]">
              Have a project, product, or idea worth building?
            </p>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
            >
              Let's talk <ArrowUp className="h-3.5 w-3.5 rotate-45" aria-hidden />
            </a>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => goToSection(item.id)}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/work" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                  All Projects
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-faint)]">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <GitHubIcon className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <LinkedInIcon className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.email}
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <Mail className="h-4 w-4" aria-hidden /> Email
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <Phone className="h-4 w-4" aria-hidden /> Call {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-[var(--text-faint)]">
            © {siteConfig.year} {siteConfig.name}. Built with React, TypeScript, Tailwind CSS &amp; GSAP.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-faint)] hover:text-[var(--text)]"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </Container>
    </footer>
  );
}
