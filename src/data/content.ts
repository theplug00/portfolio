const img = (id: string) =>
  `https://image.qwenlm.ai/generated-images/${id}/_result.png`;

export const IMAGES = {
  portrait: img("d2ede55e-1af0-4d97-b445-e507e796f8fc"),
  pulse: img("6bebccba-ac38-4fb0-8c2e-3a3e3995f8ad"),
  orrery: img("fcde9ab1-bb70-473b-97c8-d7804c718c1b"),
  atlas: img("2ae9b6a6-bb63-4d89-ac54-16bd5afe9002"),
  echo: img("d729b073-9ed9-4562-90dd-327f088a57c5"),
  ledger: img("5604d8f3-95fa-49c3-9caa-f3035ecc3088"),
  bloom: img("e6d037a0-fde4-4653-998a-ef0cc6e05fd0"),
};

export const EMAIL = "hello@aaron.dev";

/* ————————————————— work ————————————————— */

export type Project = {
  id: string;
  index: string;
  title: string;
  client: string;
  year: string;
  category: string;
  role: string;
  cover: string;
  tags: string[];
  stack: string[];
  summary: string;
  challenge: string;
  solution: string[];
  metrics: { value: string; label: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "pulse",
    index: "01",
    title: "Pulse",
    client: "Northwind Capital",
    year: "2025",
    category: "Product · Data Visualisation",
    role: "Design Engineer",
    cover: IMAGES.pulse,
    tags: ["Fintech", "Realtime", "Dashboards"],
    stack: ["TypeScript", "React", "WebSockets", "D3", "WebGL"],
    summary:
      "A realtime intelligence terminal for a proprietary trading desk — forty thousand market events per second, rendered calm enough to read at a glance.",
    challenge:
      "Northwind's analysts were drowning in terminal windows and spreadsheet exports. They needed a single surface that could ingest a firehose of tick data, visualise it without dropping frames, and stay legible during the volatility spikes that mattered most.",
    solution: [
      "Built a canvas/WebGL hybrid charting engine with a strict 16ms frame budget and virtualised data windows.",
      "Designed a density-first layout language: ambient overview panels that sharpen into focus on hover, so nothing competes for attention.",
      "Introduced typed event contracts between the feed and the UI, cutting integration bugs to near zero across releases.",
    ],
    metrics: [
      { value: "40K", label: "events / second sustained" },
      { value: "16ms", label: "render frame budget" },
      { value: "3.1×", label: "faster time-to-insight" },
    ],
  },
  {
    id: "orrery",
    index: "02",
    title: "Orrery",
    client: "Meridian Labs",
    year: "2025",
    category: "WebGL · Interactive Experience",
    role: "Creative Developer",
    cover: IMAGES.orrery,
    tags: ["WebGL", "Shaders", "Storytelling"],
    stack: ["Three.js", "GLSL", "React Three Fiber", "Zustand"],
    summary:
      "An explorable digital planetarium for an astronomy startup — 120,000 celestial bodies choreographed into a story you steer with your hands.",
    challenge:
      "Meridian wanted the public to feel orbital mechanics, not read about them. The experience had to run at 60fps on mid-tier phones while moving enough bodies to feel genuinely cosmic.",
    solution: [
      "Wrote custom GLSL instancing so the entire starfield renders in a handful of draw calls.",
      "Choreographed the camera on a scroll-driven spline with inertial easing — motion reads as physics, not animation.",
      "Progressive fidelity tiers detect GPU class and degrade geometry before they degrade framerate.",
    ],
    metrics: [
      { value: "60fps", label: "on mid-tier mobile" },
      { value: "120K", label: "bodies in one scene" },
      { value: "SOTD", label: "Awwwards · FWA of the day" },
    ],
  },
  {
    id: "atlas",
    index: "03",
    title: "Atlas Supply",
    client: "Atlas Supply Co.",
    year: "2024",
    category: "E-commerce · Web Platform",
    role: "Frontend Lead",
    cover: IMAGES.atlas,
    tags: ["Commerce", "Performance", "Design System"],
    stack: ["React", "Storefront API", "Tailwind", "Motion"],
    summary:
      "A ground-up commerce platform for a technical outdoor brand — swiss-grid calm on the surface, an obsessively tuned pipeline underneath.",
    challenge:
      "Atlas's previous store was a theme: slow, generic, and leaking conversions at every step. The brand's physical retail felt premium; the web had to match it without sacrificing speed.",
    solution: [
      "Rebuilt the storefront on a typed component library with a sub-second LCP budget enforced in CI.",
      "Replaced carousels with editorial product spreads — fewer choices, rendered beautifully, above the fold.",
      "Instrumented the funnel end-to-end so every design decision could be argued with data.",
    ],
    metrics: [
      { value: "+38%", label: "conversion rate" },
      { value: "0.8s", label: "largest contentful paint" },
      { value: "99", label: "Lighthouse performance" },
    ],
  },
  {
    id: "echo",
    index: "04",
    title: "Echo",
    client: "Echo Audio",
    year: "2024",
    category: "Product · Social Audio",
    role: "Design Engineer",
    cover: IMAGES.echo,
    tags: ["Audio", "Product", "Prototyping"],
    stack: ["React", "Web Audio API", "Canvas", "Motion"],
    summary:
      "A social audio app where sound has shape — waveform-driven identity that made a beta feel like a product people had waited years for.",
    challenge:
      "Echo's differentiator was live, shared listening — but every prototype felt like a video call with music. The interface needed to make audio the protagonist without overwhelming the conversation.",
    solution: [
      "Prototyped the waveform language directly in code with the Web Audio API, iterating weekly with real listeners.",
      "Built a 98ms end-to-end sync layer so shared playback feels simultaneous across rooms.",
      "Designed motion as feedback: every tap answers with a sonic-visual ripple, never decoration.",
    ],
    metrics: [
      { value: "250K", label: "beta listeners" },
      { value: "4.8★", label: "average store rating" },
      { value: "98ms", label: "playback sync latency" },
    ],
  },
  {
    id: "ledger",
    index: "05",
    title: "Ledger",
    client: "Parsec Systems",
    year: "2023",
    category: "Developer Tooling · SaaS",
    role: "Full-stack Engineer",
    cover: IMAGES.ledger,
    tags: ["DevTools", "CLI", "SaaS"],
    stack: ["Node.js", "tRPC", "PostgreSQL", "React"],
    summary:
      "A command-center for infrastructure teams — the terminal aesthetic developers trust, with the ergonomics of a modern product.",
    challenge:
      "Parsec's engineers lived in terminals but managed infra in spreadsheets. The tool had to feel native to keyboard-first users while remaining navigable for the ops teams who weren't.",
    solution: [
      "Designed a command palette as the spine of the product — every action reachable in two keystrokes.",
      "Shipped a typed API layer with tRPC so CLI, web and mobile share one contract.",
      "Built onboarding as a guided terminal session instead of a tour — activation rose sharply.",
    ],
    metrics: [
      { value: "12K", label: "weekly active developers" },
      { value: "−74%", label: "configuration time" },
      { value: "99.98%", label: "uptime, first year" },
    ],
  },
  {
    id: "bloom",
    index: "06",
    title: "Bloom",
    client: "Bloom Health",
    year: "2023",
    category: "Mobile · Health & Habits",
    role: "Creative Developer",
    cover: IMAGES.bloom,
    tags: ["Wellness", "Motion", "Mobile"],
    stack: ["React", "Framer Motion", "Supabase", "Rive"],
    summary:
      "A habit system that behaves like a garden — soft, organic motion that makes consistency feel grown rather than enforced.",
    challenge:
      "Habit apps punish you for being human. Bloom wanted the opposite emotional register: progress that feels alive, streaks that bend instead of break, data that comforts.",
    solution: [
      "Created a motion vocabulary of growth curves and easing borrowed from nature documentaries, not notification badges.",
      "Built resilient streak logic with 'rest days' as a first-class feature — retention climbed instead of dipped.",
      "Delivered 120fps Rive animations that stay smooth on five-year-old hardware.",
    ],
    metrics: [
      { value: "92%", label: "day-30 retention" },
      { value: "1M+", label: "guided sessions" },
      { value: "AOTD", label: "App of the Day, twice" },
    ],
  },
];

/* ————————————————— capabilities ————————————————— */

export const SERVICES = [
  {
    index: "01",
    title: "Interface Engineering",
    body: "Production React and TypeScript systems built like infrastructure: typed to the edges, tested at the seams, documented where it matters. Design systems that survive contact with real roadmaps.",
    tags: ["React", "TypeScript", "Design Systems", "Testing"],
  },
  {
    index: "02",
    title: "Creative Development",
    body: "WebGL, shaders, canvas and scroll choreography for work that needs to be felt. Award-chasing experiences engineered to hold 60fps on the devices your audience actually owns.",
    tags: ["Three.js", "GLSL", "WebGPU", "Canvas"],
  },
  {
    index: "03",
    title: "Motion & Interaction",
    body: "Micro-interactions with intent. I prototype in the real medium and design easing curves the way others design type scales — because motion is how software communicates weight.",
    tags: ["Motion Design", "Rive", "Prototyping", "Haptics"],
  },
  {
    index: "04",
    title: "Performance Engineering",
    body: "Frame budgets, Core Web Vitals, bundle forensics, rendering strategy. I treat milliseconds as a design material and ship dashboards that prove it.",
    tags: ["Core Web Vitals", "Profiling", "Edge", "CI Budgets"],
  },
  {
    index: "05",
    title: "Design Systems & Tooling",
    body: "Tokens, component libraries, internal tools and CLIs that turn design decisions into defaults. Less policing, more momentum for the teams that inherit the work.",
    tags: ["Tokens", "Storybook", "CLI", "Documentation"],
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "One intensive week: stakeholder interviews, analytics autopsy, technical audit. We leave with a constraint map and a definition of 'great' that everyone can sign.",
  },
  {
    step: "02",
    title: "Prototype",
    body: "Code-first, always. Interactive prototypes in the real medium within days — because motion, latency and feel can't be reviewed in a static mockup.",
  },
  {
    step: "03",
    title: "Build",
    body: "Weekly ship cadence against a living preview URL. You watch the product assemble itself, and every review happens on the real thing.",
  },
  {
    step: "04",
    title: "Polish & Ship",
    body: "The last 10% is the product. Motion QA, performance budgets, accessibility passes, then a handover your team will actually enjoy inheriting.",
  },
];

export const STACK_GROUPS = [
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Vite", "Tailwind", "Zustand"],
  },
  {
    label: "Creative",
    items: ["Three.js", "GLSL", "R3F", "Canvas", "SVG", "Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "tRPC", "PostgreSQL", "Redis", "Supabase", "Edge"],
  },
  {
    label: "Practice",
    items: ["Git", "Figma", "Storybook", "Playwright", "Vercel", "CI/CD"],
  },
];

/* ————————————————— experience ————————————————— */

export const JOBS = [
  {
    period: "2024 — Now",
    role: "Independent Design Engineer",
    org: "AARON.DEV · Worldwide",
    note: "Select collaborations with studios, startups and labs across four timezones.",
  },
  {
    period: "2021 — 2024",
    role: "Senior Creative Developer",
    org: "Studio Nord · Antwerp",
    note: "Led build on campaign sites and WebGL experiences; 3× Awwwards, 2× FWA.",
  },
  {
    period: "2019 — 2021",
    role: "Frontend Engineer",
    org: "Loop · Berlin",
    note: "Design system and trading UI for a fintech scale-up, 0→Series B.",
  },
  {
    period: "2017 — 2019",
    role: "UI Developer",
    org: "Framewerk · Amsterdam",
    note: "High-performance e-commerce builds for fashion and outdoor brands.",
  },
  {
    period: "2016",
    role: "BSc Computer Science",
    org: "University of Antwerp",
    note: "Thesis on real-time rendering pipelines for the web.",
  },
];

export const FACTS = [
  { k: "Based in", v: "Antwerp, Belgium" },
  { k: "Working", v: "Worldwide · UTC−5 → +9" },
  { k: "Focus", v: "Interfaces, motion, WebGL" },
  { k: "Currently", v: "Booking Q3 2026" },
  { k: "Languages", v: "EN · NL · DE" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Aaron works at a level of precision most agencies reserve for their showreel demos. Our terminal went from a wall of anxiety to the screen traders actually look at.",
    name: "Lena Hartwig",
    title: "Head of Product, Northwind Capital",
  },
  {
    quote:
      "He prototypes in the real medium from day one. What we signed off in week two was the product, not a promise of it. That changed how our whole team makes decisions.",
    name: "Jonas Verstraete",
    title: "Founder, Meridian Labs",
  },
  {
    quote:
      "A rare engineer who argues about easing curves and wins. Echo's motion language is the reason beta users said the app 'felt expensive' before we'd built half of it.",
    name: "Maya Chen",
    title: "Design Director, Echo Audio",
  },
];

/* ————————————————— writing ————————————————— */

export const POSTS = [
  {
    id: "p1",
    date: "2026 · 01",
    title: "The frame budget is the design",
    tags: ["Performance", "Motion"],
    excerpt:
      "Every animation you ship is a contract with the compositor. This essay walks through how I allocate a 16ms budget across layout, paint and script — and why the teams that treat milliseconds as a design material consistently out-ship the ones that treat them as an afterthought. Includes the exact profiling ritual I run before any release.",
  },
  {
    id: "p2",
    date: "2025 · 10",
    title: "Shaders for interface developers",
    tags: ["WebGL", "GLSL"],
    excerpt:
      "You don't need a graphics degree to write your first useful shader — you need three mental models: the fragment as a function, time as a uniform, and the screen as a field. A gentle, code-heavy bridge from CSS thinking to GPU thinking, built around five shaders I actually ship in client work.",
  },
  {
    id: "p3",
    date: "2025 · 06",
    title: "Design systems that survive contact",
    tags: ["Systems", "Process"],
    excerpt:
      "Most design systems die of documentation, not adoption. The ones that live are small, opinionated, and boring in the right places. Notes from building tokens pipelines for three companies: what to centralise, what to leave alone, and why your changelog is your marketing.",
  },
  {
    id: "p4",
    date: "2025 · 02",
    title: "Prototypes are arguments",
    tags: ["Process", "Craft"],
    excerpt:
      "A prototype isn't a preview — it's the strongest form of an argument available to a product team. On building to argue, the difference between fidelity and honesty, and why I'd rather show a working thing with rough edges than a polished thing that doesn't work.",
  },
];

/* ————————————————— socials ————————————————— */

export const SOCIALS = [
  { label: "GitHub", handle: "@aarondev", href: "https://github.com/aarondev" },
  { label: "LinkedIn", handle: "in/aarondev", href: "https://linkedin.com/in/aarondev" },
  { label: "X / Twitter", handle: "@aaron_dot_dev", href: "https://x.com/aaron_dot_dev" },
  { label: "Awwwards", handle: "aaron.dev", href: "https://www.awwwards.com/aarondev/" },
];

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Profile", href: "#profile" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const MARQUEE_ITEMS = [
  "Interfaces",
  "Motion",
  "WebGL",
  "Design Systems",
  "Creative Code",
  "Performance",
  "Prototypes",
  "Shaders",
];
