import { useEffect, useState } from "react";
import { ArrowUpRight, BookMarked, Star, GitFork } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GitHubIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

const GITHUB_USERNAME = "RafayDev123";

export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API unavailable");
        return res.json();
      })
      .then((data: Repo[]) => {
        setRepos(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
    return () => controller.abort();
  }, []);

  return (
    <section className="border-b border-[var(--border)] py-24 sm:py-28" aria-label="GitHub activity">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Open source & experiments" title="What's on GitHub." />
          <Reveal>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <GitHubIcon className="h-4 w-4" /> @{GITHUB_USERNAME}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
        </div>

        <div className="mt-12">
          {status === "loading" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading repositories">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 animate-pulse rounded-xl border border-[var(--border)] bg-[var(--surface)]" />
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                Live repository data couldn't be loaded right now.
              </p>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                View the profile on GitHub <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          )}

          {status === "ready" && repos && repos.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, i) => (
                <Reveal as="li" key={repo.id} delay={(i % 3) * 0.06}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]"
                  >
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <BookMarked className="h-4 w-4" aria-hidden />
                      <span className="truncate font-mono text-sm text-[var(--text)] group-hover:text-[var(--accent)]">
                        {repo.name}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-[var(--text-faint)]">
                      {repo.description ?? "No description provided."}
                    </p>
                    <div className="mt-4 flex items-center gap-4 font-mono text-xs text-[var(--text-faint)]">
                      {repo.language && <span>{repo.language}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" aria-hidden /> {repo.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" aria-hidden /> {repo.forks_count}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </ul>
          )}

          {status === "ready" && repos && repos.length === 0 && (
            <p className="text-sm text-[var(--text-muted)]">No public repositories to show yet.</p>
          )}
        </div>
      </Container>
    </section>
  );
}
