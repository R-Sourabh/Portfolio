export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  about: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  x?: string;
  leetcode?: string;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  live?: string;
  image: string;
  problem: string;
  approach: string;
  features: string[];
  learnings: string;
  icon: string;
  eyebrow?: string;
  highlights?: string[];
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  problem: string;
  approach: string;
  features: string[];
  learnings: string;
  icon: string;
  highlights: string[];
  tech: string[];
}


export interface MiniProject {
  title: string;
  tech: string;
  description: string;
  link: string;
  active: boolean;
}


export const personalInfo: PersonalInfo = {
  name: "Sourabh Raghuwanshi",
  role: "Software Developer",
  tagline: "Building AI-powered products, scalable web applications, and high-performance frontend experiences.",
  about: `Software Developer with 2+ years of experience building modern web applications using React, Next.js, Vue, TypeScript, Node.js, Ionic and Tailwind CSS. Experienced across frontend and backend development, with interests in AI-powered applications, performance optimization, and creating reliable product experiences.

What I Specialize In
• Frontend Engineering (React, Next.js, TypeScript)
• AI-Powered Applications & Agentic Workflows
• Full-Stack Product Development
• Performance & Scalable Architecture
• Clean, Production-Ready Code`,
  email: "rsourabh002@gmail.com",
  github: "https://github.com/R-Sourabh",
  linkedin: "https://www.linkedin.com/in/sourabh-raghuwanshi-5aa16a20a/",
};

export const skills: Record<string, string[]> = {
  "Frontend": ["React.js", "Next.js", "Vue.js", "Ionic", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Chart.js"],
  "Backend": ["Node.js", "Python", "REST APIs", "GraphQL", "PostgreSQL"],
  "Tools": ["Git", "GitHub", "GitHub Actions", "CI/CD", "Vercel", "Vitest", "Jira", "Figma"],
  "Concepts": ["Redux", "IndexedDB", "Micro Frontends", "WebSockets", "Service Workers", "Performance Optimization"],
  "AI & Automation": ["Vercel AI SDK", "Claude Code", "Codex", "Tavily API", "Agentic Workflows", "MCP Servers"]
};

export const projects: Record<string, Project[]> = {
  "Web Development": [
    {
      id: 1,
      title: "NutShell AI",
      date: "Jan 2024",
      description: "An AI-native productivity hub using Next.js and Vercel AI SDK to automate research and task planning.",
      longDescription: "Built an AI-native productivity hub using Next.js and Vercel AI SDK to automate research and task planning. It streams dynamic, context-aware action plans and orchestrated tasks via agentic workflows.",
      tech: ["Next.js", "React.js", "Vercel AI SDK", "shadcn/ui", "Framer Motion", "Tavily API", "Groq AI", "Supabase"],
      github: "https://github.com/R-Sourabh/NutShell-AI",
      live: "https://nutshell-ai.vercel.app",
      image: "/nutshell-ai.png",
      problem: "Traditional research and task-planning workflows are manual, disjointed, and slow to produce context-aware execution plans.",
      approach: "Used Vercel AI SDK and Groq AI for streaming Generative UI elements, integrated Tavily API for real-time web research, and Supabase for secure persistence and auth.",
      features: [
        "AI-native productivity & research automated planning",
        "Generative UI Component Streaming using React, shadcn/ui, and Framer Motion",
        "Agentic workflows orchestrating real-time web research via Tavily API",
        "Groq AI integration for fast LLM responses",
        "Supabase for authentication and real-time state persistence"
      ],
      learnings: "Mastered engineering streaming UI layouts, designing robust LLM agent loops, and orchestrating serverless edge persistence.",
      icon: "🤖",
      eyebrow: "AI Research Agent",
      highlights: [
        "Built an AI-native productivity hub using Next.js and Vercel AI SDK to automate research.",
        "Enhanced streaming Generative UI using React, shadcn/ui, and Framer Motion.",
        "Implemented agentic workflows for automated research, planning, and task orchestration.",
        "Integrated Tavily API and Groq AI to generate context-aware plans from real-time web research.",
        "Leveraged Supabase for authentication, real-time persistence, and secure management."
      ]
    }
  ],
  "PWA & Hybrid Apps": [
    {
      id: 2,
      title: "Inventory Cycle Count",
      date: "Aug 2024",
      description: "An offline-first inventory PWA using Vue.js, Ionic, and IndexedDB for high-volume store operations and retail scans.",
      longDescription: "An offline-first inventory PWA engineered using Vue.js, Ionic, and IndexedDB for high-volume store cycle counts. Supports robust local storage, conflict resolution locks, and background sync queues.",
      tech: ["Vue.js", "Ionic", "IndexedDB", "TypeScript", "Pinia", "MCP", "Playwright"],
      github: "https://github.com/R-Sourabh/inventory-count",
      live: "https://inventorycount-dev.hotwax.io/",
      image: "/inventory-count.png",
      problem: "Store environments experience frequent network drops, risking data loss during inventory scanning sessions.",
      approach: "Built local-first scanning with IndexedDB and device locking heartbeats, and created background sync queues using idempotent APIs.",
      features: [
        "Offline-first PWA inventory scanner using IndexedDB & Ionic",
        "Reliable offline synchronization with device conflict locking and heartbeats",
        "Background task queues reducing server payload sizes by 40%",
        "Virtual scrolling and lazy loading in Pinia for 4,000+ local records",
        "MCP integration with GitHub and Playwright for agentic testing automation"
      ],
      learnings: "Deepened expertise in local-first data concurrency, offline synchronization algorithms, and hybrid PWA optimization.",
      icon: "📦",
      eyebrow: "Store Operations PWA",
      highlights: [
        "Built an offline-first inventory PWA using Vue.js, Ionic, and IndexedDB.",
        "Engineered reliable offline synchronization with device locking, heartbeats, and idempotent APIs.",
        "Reduced server payload sizes by 40% through optimized requests and background aggregation.",
        "Optimized processing of 4,000+ records using virtual scrolling, lazy loading, and Pinia.",
        "Integrated MCP servers with GitHub and Playwright to enable agent-driven testing."
      ]
    }
  ],
  "Frontend Architecture": [
    {
      id: 3,
      title: "Micro-Frontend OMS Integrations",
      date: "Dec 2025",
      description: "Scalable micro-frontend ecosystem for Order Management Systems, providing dynamic module loading and shared component libraries.",
      longDescription: "Designed and implemented micro frontend modules for OMS suites using reusable web components, leading to faster build times, independent deployments, and streamlined store operations.",
      tech: ["Vue.js", "Webpack Module Federation", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/R-Sourabh",
      live: "https://github.com/R-Sourabh",
      image: "/micro-frontend.png",
      problem: "Monolithic frontend scaling issues, resulting in slow release cycles and tightly coupled codebase.",
      approach: "Divided the suite into independent micro-frontends integrated dynamically at runtime.",
      features: [
        "Module Federation configuration",
        "Dynamic runtime loading of components",
        "Shared state coordination",
        "Unified visual style"
      ],
      learnings: "Mastered configuring module federation, custom web components, and building cohesive design systems.",
      icon: "🏗️",
      eyebrow: "OMS Suite Architecture",
      highlights: [
        "Improved build and deployment speed.",
        "Created shared web components library.",
        "Dynamic layout orchestration."
      ]
    },
    {
      id: 4,
      title: "HotWax DXP Components",
      date: "Jun 2024",
      description: "A reusable UI component library packaging shared store utilities like timezone switchers, i18n localization, and modular components.",
      longDescription: "Developed and maintained a packaged library of modular, accessible, and reusable UI components for the HotWax Digital Experience Platform (DXP). Designed to standardize internationalization, Luxon timezones, and session handling across all retail apps.",
      tech: ["Vue.js", "Ionic", "TypeScript", "Luxon", "npm", "Rollup"],
      github: "https://github.com/R-Sourabh/dxp-components",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&auto=format&fit=crop",
      problem: "Standardizing common utilities like internationalization, timezone selection, and session states across multiple separate apps led to code duplication and visual inconsistencies.",
      approach: "Built a packaged component library using Vue, Ionic, and TypeScript, compiled using Rollup, and distributed via npm registry for seamless dependency management.",
      features: [
        "Timezone switcher component with customizable token-based Luxon formatting",
        "Universal internationalization (i18n) setup for multilingual store application support",
        "Standardized web component structures fully compatible with Ionic framework guidelines",
        "Rollup-based module packaging for lightweight and optimized distribution",
        "Shared state session management adapters for plug-and-play app integration"
      ],
      learnings: "Mastered building production-ready component libraries, module bundling configuration, and managing private/public npm registries.",
      icon: "🧩",
      eyebrow: "NPM Component Library",
      highlights: [
        "Created modular component interfaces to standardize store app layouts.",
        "Built a Luxon-powered time zone switcher with custom format overrides.",
        "Integrated central localization assets for enterprise scale-out.",
        "Distributed via npm registry for cross-app package dependency management."
      ]
    }
  ]
};


export const miniProjects: MiniProject[] = [
  {
    title: "Offline Sync Engine",
    tech: "TypeScript",
    description: "An isolated sync framework using IndexedDB and Service Workers to enqueue and retry failed REST API requests.",
    link: "https://github.com/R-Sourabh",
    active: true,
  },
  {
    title: "Custom Charts Dashboard",
    tech: "Chart.js & Vue",
    description: "A fast analytics dashboard widget showing order reconciliation metrics and sync state transitions.",
    link: "https://github.com/R-Sourabh",
    active: false,
  },
  {
    title: "Tailwind UI Library",
    tech: "Tailwind CSS",
    description: "A custom set of accessible, highly reusable glassmorphic components and grids.",
    link: "https://github.com/R-Sourabh",
    active: false,
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Hotwax Commerce",
    role: "Software Developer",
    duration: "Feb 2024 - Present",
    location: "Indore, MP",
    description: "Developed enterprise OMS systems, micro-frontends, and offline-first PWAs with high-volume barcode scanning and request optimization.",
    problem: "Monolithic client application scaling issues and network instability during store inventory cycles caused sync delays, data loss, and transaction conflicts.",
    approach: "Implemented Webpack Module Federation for micro-frontends, built IndexedDB/Web Worker PWA sync engines, and migrated workflows to Moqui Framework using Groovy.",
    features: [
      "Webpack Module Federation for micro-frontends enabling independent deployments",
      "IndexedDB & Web/Service Workers for offline-first store operations scaling to 4,000+ concurrent records",
      "Moqui Framework & Groovy migration for client reporting, eliminating 100% dependency on Apache NiFi",
      "Payload reduction and REST API request aggregation optimizations"
    ],
    learnings: "Mastered configuring module federation, designing resilient local-first database sync algorithms, and building highly optimized retail commerce pipelines.",
    icon: "💼",
    highlights: [
      "Developed OMS applications using React.js, Redux, and Ionic for critical eCommerce and inventory operations.",
      "Delivered and reviewed 300+ pull requests across frontend applications, contributing to feature development, bug fixes, and code quality improvements.",
      "Implemented Micro Frontends using Webpack Module Federation, enabling independent deployments, improved scalability, and faster application loading.",
      "Built offline-first inventory counting PWAs using IndexedDB and Web Workers, enabling efficient processing of 4,000+ inventory records concurrently.",
      "Reduced API payload sizes by up to 40% through request optimization and efficient data aggregation.",
      "Migrated client reporting workflows from NiFi to the Moqui Framework using Groovy services and XML configs, eliminating 100% dependency on NiFi and simplifying report-processing pipelines."
    ],
    tech: ["React.js", "Redux", "Ionic", "Webpack Module Federation", "IndexedDB", "Groovy", "Moqui"]
  },
  {
    id: 2,
    company: "ZignEx",
    role: "Front End Developer",
    duration: "Sep 2023 - Jan 2024",
    location: "Remote",
    description: "Built responsive logistics optimization and geospatial planning tools with custom Wijmo and OpenLayers mapping components.",
    problem: "Geospatial depot planning and territory design platforms required highly interactive maps and responsive grid controls that were slow and difficult to maintain.",
    approach: "Extended OpenLayers and Wijmo libraries, and rewrote legacy libraries in modern TypeScript/Angular with Tailwind CSS.",
    features: [
      "Geospatial routing & territory design map layers using OpenLayers",
      "High-performance Wijmo grid components for logistics metrics",
      "Legacy JavaScript to TypeScript/Angular migration yielding 30% performance boost",
      "Tailwind CSS-driven responsive UI system"
    ],
    learnings: "Mastered geospatial map layers, custom data grid behaviors, and legacy codebase modernization.",
    icon: "🗺️",
    highlights: [
      "Built enterprise web applications using Angular, TypeScript, and Tailwind CSS for logistics optimization workflows.",
      "Improved geospatial and data-intensive planning tools for territory design, depot planning, route optimization, and operational decision-making.",
      "Extended Wijmo and OpenLayers libraries to create reusable mapping and data grid components adopted across 7+ enterprise applications.",
      "Migrated a reusable library from JavaScript to Angular and TypeScript, improving performance by 30% and maintainability."
    ],
    tech: ["Angular", "TypeScript", "Tailwind CSS", "Wijmo", "OpenLayers"]
  },
  {
    id: 3,
    company: "Persistent Systems",
    role: "Software Developer Intern",
    duration: "Jan 2023 - June 2023",
    location: "Remote",
    description: "Engineered full-stack MERN applications focusing on high-speed routing and database performance optimization.",
    problem: "Need to develop secure, performant full-stack features following strict software development life cycle (SDLC) stages and robust unit testing.",
    approach: "Leveraged MERN stack with automated testing patterns and agile practices.",
    features: [
      "Full-stack MERN (React, Node, Express, MongoDB) architecture",
      "Automated unit testing & CI/CD workflows",
      "Agile scrum development & SDLC patterns",
      "Optimized database indexing and queries"
    ],
    learnings: "Gained solid fundamentals in production-level database optimizations, comprehensive unit testing, and agile team workflows.",
    icon: "🎓",
    highlights: [
      "Completed intensive training in SDLC, Testing, and MERN stack development.",
      "Worked on full-stack applications using React.js, Node.js, and MongoDB, focusing on performance."
    ],
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Testing"]
  }
];

