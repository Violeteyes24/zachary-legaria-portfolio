/**
 * Structured content for the portfolio.
 *
 * This is the single source of truth for all repeated / list-driven content
 * that the design renders (nav, socials, stats, skills, experience, and the
 * project case studies). Components read from here so markup stays declarative.
 */

export type NavItem = {
  label: string;
  /** In-page anchor, e.g. "/#work"; resolves from any route. */
  href: string;
};

export type Social = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type ExperienceItem = {
  dates: string;
  location: string;
  role: string;
  company: string;
  blurb: string;
  tags: string[];
};

export type Project = {
  /** URL slug and stable id. */
  slug: string;
  name: string;
  category: string;
  year: string;
  role: string;
  /** Short one-liner shown on cards. */
  result: string;
  /** Optional cover / hero image path under /public (e.g. "/projects/doc-qa.png"). */
  cover?: string;
  /** Longer lead paragraph. */
  summary: string;
  tech: string[];
  overview: string;
  problem: string;
  responsibilities: string[];
  constraints: string[];
  process: string[];
  decisions: string[];
  solution: string;
  results: string[];
  lessons: string;
};

export const profile = {
  name: "Zachary Legaria",
  fullName: "Zachary Albert Legaria",
  monogram: "ZL",
  availability: "Available for remote work",
  location: "Bohol, Philippines",
  timezone: "Asia/Manila",
  coordinates: { lat: "9.65°N", lon: "123.85°E" },
  email: "gmzach024@gmail.com",
  resumeHref: "/resume.pdf",
  /** Hero headline split so accent phrases can be highlighted. */
  headline: [
    { text: "Software engineer building " },
    { text: "full-stack products", accent: true },
    { text: " & " },
    { text: "AI systems", accent: true },
    { text: "." },
  ] as { text: string; accent?: boolean }[],
  tagline:
    "I build secure, scalable products end-to-end, from Django and Flutter apps to production RAG pipelines and the deployments that keep them running.",
  heroSubtext:
    "Currently an AI Engineer at Apnea Dynamics and Full-Stack Lead at MedSync, shipping RAG pipelines, cross-platform apps, and production deployments from Bohol, Philippines.",
  footerBlurb:
    "Full-stack & AI engineer. Building quietly reliable software, usually late at night, always with real deadlines.",
} as const;

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Violeteyes24" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/zachary-albert-legaria-421331259",
  },
  { label: "Email", href: "mailto:gmzach024@gmail.com" },
];

export const stats: Stat[] = [
  { value: "5+", label: "Production apps shipped" },
  { value: "3", label: "Engineering roles held" },
  { value: "Cum Laude", label: "BS Information Technology" },
  { value: "GDSC", label: "Former chapter President" },
];

export const about = {
  /** Optional portrait image path under /public (e.g. "/portrait.jpg"). */
  portrait: "",
  heading:
    "I like turning fuzzy problems into secure, shippable software.",
  paragraphs: [
    "I'm a full-stack developer and AI engineer from Bohol, Philippines. I graduated Cum Laude in Information Technology and led my university's Google Developer Student Clubs chapter before moving into production work across Django, Flutter, Next.js, and Supabase.",
    "My approach is pragmatic: understand the real constraint, choose boring-reliable tools, and ship something people can actually use. Lately that's meant building RAG pipelines with pgvector, automating workflows with n8n, and deploying Next.js apps on Vercel.",
  ],
  callout:
    "For four months I held two engineering roles at once. Not moonlighting, but with full transparency and buy-in from both teams. It taught me disciplined communication, time-boxing, and how to keep quality high under real load.",
  interests: [
    "Community building",
    "Developer mentoring",
    "Hackathons",
    "Startup pitching",
    "Open source",
  ],
} as const;

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["Python", "TypeScript", "JavaScript", "Dart", "PHP"] },
  {
    title: "Frameworks",
    items: ["Django / DRF", "Next.js", "Flutter", "React Native", "Laravel"],
  },
  {
    title: "AI & Data",
    items: ["RAG pipelines", "pgvector (HNSW)", "n8n automation", "Supabase Edge Fns"],
  },
  {
    title: "Infra & Tools",
    items: ["PostgreSQL", "DigitalOcean VPS", "Vercel CI/CD", "Linux · SSH", "GitHub"],
  },
];

export const experience: ExperienceItem[] = [
  {
    dates: "03/2026 - Present",
    location: "Panglao, Bohol",
    role: "AI Engineer / Developer",
    company: "Apnea Dynamics Inc.",
    blurb:
      "Built a production RAG pipeline on Supabase (section-aware chunking, pgvector + HNSW, Edge Functions), automated workflows with n8n, integrated the Facebook Graph API, and deployed several Next.js apps on Vercel.",
    tags: ["RAG", "n8n", "Supabase", "Vercel"],
  },
  {
    dates: "07/2025 - Present",
    location: "Tagbilaran City",
    role: "Full-Stack Developer Lead",
    company: "MedSync Digital Technologies",
    blurb:
      "Led end-to-end development of a mobile-first medical platform: Django + DRF APIs with JWT and role-based access, cross-platform Flutter apps, PayMongo payments with HMAC-SHA256 webhooks, deployed on a DigitalOcean VPS.",
    tags: ["Django", "Flutter", "PayMongo", "VPS"],
  },
  {
    dates: "02/2025 - 05/2025",
    location: "Tagbilaran City",
    role: "Backend Developer Intern",
    company: "Blenditoro Corporation",
    blurb:
      "Built RESTful APIs with authentication and third-party integrations following MVC principles, documented endpoints in Postman, and contributed to a production-ready backend during the internship.",
    tags: ["REST", "MVC", "Postman"],
  },
];

export const projects: Project[] = [
  {
    slug: "doc-qa",
    name: "Document Q&A Assistant",
    category: "AI Engineering",
    year: "2026",
    role: "Solo builder",
    result: "Grounded, cited answers over your own documents.",
    summary:
      "A retrieval-augmented (RAG) assistant that lets users upload documents and ask questions, returning answers grounded in their own content instead of hallucinating.",
    tech: ["Supabase", "pgvector", "OpenAI", "Deno Edge Functions", "Next.js"],
    overview:
      "Document Q&A Assistant turns a pile of files into a searchable, conversational knowledge base. Users upload documents, the system embeds and indexes them, and questions are answered with context pulled straight from the source material.",
    problem:
      "Teams sit on large document sets but can't get fast, trustworthy answers. Generic chatbots hallucinate because they aren't grounded in the source, and full-text search misses meaning.",
    responsibilities: [
      "End-to-end architecture and build",
      "Ingestion and embedding pipeline",
      "Retrieval and prompt design",
      "Auth and per-user data isolation",
    ],
    constraints: [
      "Solo build on a tight timeline",
      "Keep inference and storage costs low",
      "Strict isolation between users' documents",
    ],
    process: [
      "Chunk documents section-aware: markdown ## headers with a 500-token cap",
      "Embed each chunk with text-embedding-3-small and store vectors in pgvector",
      "Index with HNSW for fast approximate nearest-neighbour search",
      "Retrieve by cosine similarity and feed the top context into GPT",
    ],
    decisions: [
      "Chose pgvector + HNSW over a separate vector database to keep the whole stack in Postgres",
      "Section-aware chunking to preserve context boundaries and improve answer relevance",
      "Ran ingestion and search as Supabase Edge Functions (Deno) to stay fully serverless",
    ],
    solution:
      "A Supabase-backed pipeline: documents are chunked, embedded, and indexed; each query runs semantic search and GPT composes a grounded answer. Row-level security ensures every user only ever reaches their own documents.",
    results: [
      "Relevant, source-grounded answers over private docs",
      "Low-latency retrieval via HNSW approximate indexing",
      "Zero cross-tenant data exposure through row-level security",
    ],
    lessons:
      "Chunk boundaries matter as much as the model. Section-aware splitting moved answer quality more than any amount of prompt tweaking.",
  },
  {
    slug: "mentalhelp",
    name: "MentalHelp",
    category: "Full-Stack · Capstone",
    year: "2024-25",
    role: "Lead developer",
    result: "Campus mental-health platform, web + mobile.",
    summary:
      "A full-stack mental-health platform for Holy Name University, with a web app and companion mobile app for triage, appointments, messaging, and analytics.",
    tech: ["Next.js", "React Native", "PostgreSQL", "Expo", "Vercel"],
    overview:
      "MentalHelp is a mobile-first ecosystem that connects students with campus support. It pairs a rule-based triage chatbot with an appointment system, real-time messaging, and administrative dashboards.",
    problem:
      "Students needed a private, low-friction way to reach campus mental-health support. The existing process was manual, hard to track, and easy to avoid.",
    responsibilities: [
      "Led end-to-end development",
      "System architecture",
      "Web and mobile implementation",
      "Deployment and handover",
    ],
    constraints: [
      "Fixed capstone timeline and scope",
      "Cross-platform: web and Android",
      "Primarily non-technical end users",
    ],
    process: [
      "Mapped the appointment and messaging flows with stakeholders",
      "Built the web app in Next.js and mobile in React Native / Expo",
      "Modeled records and relationships in PostgreSQL",
      "Shipped the web app to Vercel and an installable Expo Go build",
    ],
    decisions: [
      "A rule-based chatbot for predictable, safe responses over an unpredictable LLM",
      "Real-time messaging and notifications to keep the loop responsive",
      "Admin dashboards so counselors could see analytics and reports at a glance",
    ],
    solution:
      "A mobile-first platform: rule-based triage chatbot, appointment booking, real-time messages and notifications, and dashboard analytics, all behind authentication and role-based authorization.",
    results: [
      "Delivered as the graduating capstone project",
      "Working web app plus a downloadable Android build",
      "Recognized in university review and demos",
    ],
    lessons:
      "Designing for non-technical users forced clarity. The simplest possible flow almost always won.",
  },
  {
    slug: "command-center",
    name: "Personal Daily Command Center",
    category: "Product · Personal",
    year: "2025",
    role: "Designer & engineer",
    result: "One private cockpit for tasks, habits, money & mood.",
    summary:
      "A self-use life dashboard that unifies tasks, habits, expenses, notes, and mood into a single fast, private interface.",
    tech: ["Next.js 15", "TypeScript", "Tailwind", "Prisma", "Clerk"],
    overview:
      "The Command Center is a daily driver I built for myself, a single screen that replaces the handful of apps I used to juggle for planning and tracking.",
    problem:
      "My daily tracking was scattered across half a dozen apps. I wanted one fast, private place to see and steer the day.",
    responsibilities: [
      "Product design and engineering",
      "Data modeling",
      "Auth and deployment",
    ],
    constraints: [
      "Side-project time budget",
      "Had to stay genuinely fast and private",
      "Only worth it if I'd actually use it daily",
    ],
    process: [
      "Modeled entities (tasks, habits, expenses, notes, mood) in Prisma + PostgreSQL",
      "Built the UI with Next.js 15 App Router, Tailwind, and ShadCN UI",
      "Validated every input with shared Zod schemas",
      "Secured with Clerk auth and server-side actions",
    ],
    decisions: [
      "Server-side actions to keep business logic on the backend",
      "Zod schemas shared end-to-end so validation never drifts",
      "Custom domain via Hostinger for a real, ownable home",
    ],
    solution:
      "A Next.js 15 dashboard with typed server actions, Prisma persistence, and Clerk auth. One clean overview of the day, deployed on Vercel with a custom domain.",
    results: [
      "A tool I actually open every day",
      "Type-safe from form input to database row",
      "Zero-friction private tracking in one place",
    ],
    lessons:
      "Building for myself sharpened my taste. Every extra click had to justify its own existence.",
  },
  {
    slug: "cdai",
    name: "CDAI",
    category: "Data · Analytics",
    year: "2026",
    role: "Full-stack developer",
    result: "A single source of truth for lead attribution.",
    summary:
      "A lead-attribution and analytics dashboard for Apnea Dynamics that shows where leads come from and how they convert.",
    tech: ["Next.js", "Vercel", "Node 24.x", "CI/CD"],
    overview:
      "CDAI gives the team one place to understand lead sources and conversion, replacing scattered spreadsheets with a live dashboard deployed continuously on Vercel.",
    problem:
      "Marketing effort was hard to attribute. The team lacked a single, trustworthy view of where leads came from and what happened to them.",
    responsibilities: [
      "Full-stack build",
      "Data aggregation and dashboard",
      "Deployment and CI/CD",
    ],
    constraints: [
      "Internal production use by a real team",
      "Reliable, understandable data refresh",
      "Reporting that's clear at a glance",
    ],
    process: [
      "Aggregated lead sources into one unified data model",
      "Built dashboard views and reports in Next.js",
      "Deployed on Vercel with Git-based CI/CD on the Node 24.x runtime",
    ],
    decisions: [
      "Next.js on Vercel for fast iteration and continuous delivery",
      "An attribution model tuned to the team's actual funnel, not a generic one",
    ],
    solution:
      "A Next.js analytics dashboard on Vercel that attributes leads to their sources and surfaces conversion metrics, deployed continuously from the main branch.",
    results: [
      "One source of truth for lead attribution",
      "Continuous deploys straight from main",
      "Faster, clearer reporting for the team",
    ],
    lessons:
      "Attribution is a data-modeling problem first and a UI problem second. Get the model right and the dashboard writes itself.",
  },
  {
    slug: "community-manager",
    name: "Community Manager",
    category: "Internal Tools",
    year: "2026",
    role: "Full-stack developer",
    result: "Community operations, centralized.",
    summary:
      "An internal community-management web app for Apnea Dynamics that centralizes members, content, and engagement in one place.",
    tech: ["Next.js", "Vercel", "CI/CD"],
    overview:
      "Community Manager is an internal tool that pulls community operations out of scattered chats and spreadsheets into a single, task-focused app.",
    problem:
      "Community operations were spread across chat threads and spreadsheets, which made coordination slow and error-prone.",
    responsibilities: ["Full-stack build", "Deployment and maintenance"],
    constraints: [
      "Internal tool that needed to be fast to iterate",
      "Low-friction for day-to-day operators",
    ],
    process: [
      "Built the app with Next.js",
      "Kept the surface simple and task-focused",
      "Deployed on Vercel with Git-based CI/CD",
    ],
    decisions: [
      "Prioritized a small, obvious surface over feature breadth",
      "Continuous delivery so fixes ship the moment they land",
    ],
    solution:
      "A Next.js internal app on Vercel that centralizes community-management tasks and keeps operations in one predictable place.",
    results: [
      "Centralized, less error-prone community operations",
      "Continuous delivery on Vercel",
      "A calmer daily workflow for operators",
    ],
    lessons:
      "Internal tools live or die by how little friction they add. Restraint is the feature.",
  },
];

/** Look up a single project by slug (used by the case-study route). */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Neighbouring projects for prev/next navigation (wraps around). */
export function getAdjacentProjects(slug: string): {
  prev: Project;
  next: Project;
} | null {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) return null;
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  return { prev, next };
}

/** Build a prefilled mailto: link for the contact section. */
export function buildMailto(name?: string, message?: string): string {
  const subject = "Portfolio project inquiry";
  const greeting = name ? `Hi Zachary,\n\nI'm ${name}. ` : "Hi Zachary,\n\n";
  const body = greeting + (message ?? "");
  return `mailto:${profile.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
