import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance mt-4 font-display text-[clamp(1.9rem,4.2vw,3rem)] font-medium leading-[1.08] text-[var(--text)]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-muted)] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
