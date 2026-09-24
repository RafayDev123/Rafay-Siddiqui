import type { Project } from "@/data/projects";

export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const { accent, kind } = project.visual;

  if (project.image) {
    return (
      <div className={className} style={{ background: `linear-gradient(155deg, ${accent}22, transparent 60%), var(--surface)` }}>
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(155deg, ${accent}22, transparent 60%), var(--surface)`,
      }}
      aria-hidden="true"
    >
      <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
        {kind === "browser" && <BrowserFrame accent={accent} title={project.title} />}
        {kind === "dashboard" && <DashboardFrame accent={accent} title={project.title} />}
        {kind === "mobile" && <MobileFrame accent={accent} title={project.title} />}
      </div>
    </div>
  );
}

function Chrome({ accent }: { accent: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/20 px-3 py-2">
      <span className="h-2 w-2 rounded-full" style={{ background: `${accent}99` }} />
      <span className="h-2 w-2 rounded-full bg-white/20" />
      <span className="h-2 w-2 rounded-full bg-white/20" />
      <div className="ml-3 h-2.5 flex-1 max-w-[140px] rounded-full bg-white/10" />
    </div>
  );
}

function BrowserFrame({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] shadow-2xl">
      <Chrome accent={accent} />
      <div className="space-y-3 p-5">
        <div className="h-3 w-2/5 rounded-full" style={{ background: `${accent}bb` }} />
        <div className="h-2 w-4/5 rounded-full bg-white/10" />
        <div className="h-2 w-3/5 rounded-full bg-white/10" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-14 rounded-md bg-white/[0.06]" />
          <div className="h-14 rounded-md bg-white/[0.06]" />
          <div className="h-14 rounded-md" style={{ background: `${accent}33` }} />
        </div>
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}

function DashboardFrame({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] shadow-2xl">
      <Chrome accent={accent} />
      <div className="grid grid-cols-4 gap-3 p-5">
        <div className="col-span-1 space-y-2">
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
          <div className="h-2 w-3/5 rounded-full" style={{ background: `${accent}99` }} />
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
        </div>
        <div className="col-span-3 space-y-3">
          <div className="flex items-end gap-1.5 h-16">
            {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, background: i === 5 ? accent : `${accent}44` }}
              />
            ))}
          </div>
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}

function MobileFrame({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="flex w-full max-w-md items-center justify-center gap-6">
      <div className="w-32 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] shadow-2xl">
        <div className="h-4 border-b border-white/10 bg-black/20" />
        <div className="space-y-2 p-3">
          <div className="h-10 w-full rounded-md" style={{ background: `${accent}33` }} />
          <div className="h-2 w-4/5 rounded-full bg-white/10" />
          <div className="h-2 w-3/5 rounded-full bg-white/10" />
          <div className="h-14 w-full rounded-md bg-white/[0.06]" />
          <div className="h-14 w-full rounded-md bg-white/[0.06]" />
        </div>
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}
