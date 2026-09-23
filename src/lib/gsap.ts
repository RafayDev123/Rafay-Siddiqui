import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins exactly once for the whole app.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default gsap;
export { ScrollTrigger };
