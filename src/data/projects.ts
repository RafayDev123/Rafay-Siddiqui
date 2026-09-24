// Project data model.
// Add a new project by appending an object to this array — the Work list,
// featured section, and case-study route all read from this single source.
// Only include fields that are actually true. Unknown fields are simply
// omitted, and the UI hides the corresponding section instead of guessing.

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  role?: string;
  year?: string;
  featured?: boolean;
  confidential?: boolean;
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Visual identity used to render the abstract project preview (no fabricated screenshots). */
  image?: string;
  visual: {
    accent: string; // tailwind-style hex used for gradient/border accents
    kind: "browser" | "mobile" | "dashboard";
  };
};

export const projects: Project[] = [
  {
    id: "saas-fusion",
    slug: "saas-fusion",
    title: "SaaS Fusion",
    category: "SaaS Dashboard / Commerce",
    tagline: "A premium storefront and analytics hub that blends product discovery with admin control.",
    description:
      "A polished SaaS dashboard and storefront concept combining product discovery, secure auth, live analytics, and admin workflows in one responsive experience.",
    technologies: ["React", "Material UI", "Tailwind CSS", "Bootstrap", "JavaScript"],
    role: "Frontend Developer",
    featured: true,
    liveUrl: "https://stalwart-chebakia-d07da2.netlify.app/",
    features: [
      "Glassmorphism-inspired dashboard UI",
      "Secure onboarding and auth flow",
      "Live KPI cards and analytics widgets",
      "Product search, filters, and browsing",
      "Admin management and commerce operations",
    ],
    image: "/Saas-fushion.png",
    visual: { accent: "#7c3aed", kind: "dashboard" },
  },
  {
    id: "news-app",
    slug: "news-app",
    title: "News App",
    category: "React Application",
    tagline: "Fast, category-driven news reading built on live APIs.",
    description:
      "A React-powered news application focused on speed and a seamless reading experience, pulling live articles from a REST news API.",
    technologies: ["React", "JavaScript", "REST APIs"],
    role: "Frontend Developer",
    featured: true,
    features: [
      "API-driven article fetching",
      "Category-based navigation",
      "Up-to-date content",
      "Responsive interface across breakpoints",
    ],
    image: "/NewsApp.png",
    visual: { accent: "#6366f1", kind: "browser" },
  },
  {
    id: "smit-dashboard",
    slug: "smit-dashboard",
    title: "SMIT Dashboard",
    category: "Data Dashboard",
    tagline: "A clear, responsive dashboard for day-to-day data management.",
    description:
      "A responsive data-management dashboard with clear visualizations built to support quicker, more confident decision-making.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Developer",
    featured: true,
    image: "/Ar-dashboard.png",
    visual: { accent: "#22d3ee", kind: "dashboard" },
  },
  {
    id: "executive-chauffeur",
    slug: "executive-chauffeur-service",
    title: "Executive Chauffeur Service",
    category: "Marketing Website",
    tagline: "A premium brand site for a punctual, client-first chauffeur service.",
    description:
      "A responsive marketing website for a premium chauffeur brand, built to emphasize punctuality and client-focused service.",
    technologies: ["HTML5", "CSS3", "Bootstrap"],
    role: "Frontend Developer",
    featured: true,
    image: "/Executive-Chauffeur-Service.png",
    visual: { accent: "#f59e0b", kind: "browser" },
  },
  {
    id: "medical-webpage",
    slug: "medical-webpage",
    title: "Medical Webpage",
    category: "Healthcare Website",
    tagline: "A calmer, patient-friendly way to navigate healthcare information.",
    description:
      "A responsive healthcare website centered around usability and patient-friendly navigation.",
    technologies: ["HTML5", "CSS3"],
    role: "Frontend Developer",
    image: "/Medical-webpage.png",
    visual: { accent: "#34d399", kind: "browser" },
  },
  {
    id: "aitheos",
    slug: "aitheos",
    title: "AITHEOS",
    category: "Brand Website",
    tagline: "A modern digital identity for a technology-focused brand.",
    description:
      "A modern digital-brand website for a technology-focused company, built with an emphasis on clarity and visual identity.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Developer",
    image: "/Aithoes.png",
    visual: { accent: "#818cf8", kind: "browser" },
  },
  {
    id: "ar-business",
    slug: "ar-business",
    title: "AR Business",
    category: "Product Catalogue",
    tagline: "A structured catalogue-style site for browsing products.",
    description:
      "A business-facing product catalogue website focused on clear structure and easy browsing.",
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    role: "Frontend Developer",
    image: "/Ar-dashboard.png",
    visual: { accent: "#f472b6", kind: "browser" },
  },
  {
    id: "beeptool",
    slug: "beeptool",
    title: "BeepTool",
    category: "Web Tool / UI",
    tagline: "A focused UI for a single-purpose web tool.",
    description:
      "A UI-focused web tool built with an emphasis on a clean, usable interface.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Developer",
    image: "/BeepTool.png",
    visual: { accent: "#60a5fa", kind: "dashboard" },
  },
  {
    id: "clean-phone",
    slug: "clean-phone",
    title: "Clean Phone",
    category: "Service Website",
    tagline: "A service-brand site built to be simple and easy to act on.",
    description:
      "A service website built around a clear call-to-action and simple navigation.",
    technologies: ["HTML5", "CSS3", "Bootstrap"],
    role: "Frontend Developer",
    image: "/clean-phone.png",
    visual: { accent: "#a78bfa", kind: "browser" },
  },
  {
    id: "royal-vapoo-store",
    slug: "royal-vapoo-store",
    title: "Royal Vapoo Store",
    category: "Retail / Brand Page",
    tagline: "A retail brand page built to present products cleanly.",
    description:
      "A retail brand page focused on product presentation and a straightforward shopping-adjacent layout.",
    technologies: ["HTML5", "CSS3", "Bootstrap"],
    role: "Frontend Developer",
    image: "/Royal-vapo-store.png",
    visual: { accent: "#fb7185", kind: "mobile" },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  return { next, previous };
}

export const featuredProjects = projects.filter((p) => p.featured);
