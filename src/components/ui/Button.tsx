import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-[var(--text)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white px-6 py-3 text-sm",
  secondary:
    "border border-[var(--border-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] px-6 py-3 text-sm",
  ghost:
    "text-[var(--text-muted)] hover:text-[var(--text)] px-2 py-1 text-sm",
};

type CommonProps = {
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, CommonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
);
Button.displayName = "Button";

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(({ variant = "primary", className, children, ...props }, ref) => (
  <a ref={ref} className={cn(base, variants[variant], className)} {...props}>
    {children}
  </a>
));
LinkButton.displayName = "LinkButton";
