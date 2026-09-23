import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";
import { useMotionPreference } from "@/lib/MotionPreferenceContext";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li";
};

/** Fades/slides content in once it enters the viewport. No-ops instantly for reduced motion. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduced) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [reduced] }
  );

  const Component = as as any;
  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
