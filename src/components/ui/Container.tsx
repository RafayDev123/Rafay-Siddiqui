import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Component = As;
  return (
    <Component className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </Component>
  );
}
