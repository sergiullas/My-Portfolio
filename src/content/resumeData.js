// -----------------------------------------------------------------------------
// content/resumeData.js
// Structured data that powers resume pages/sections.
//
// - Exports JSON-like objects/arrays for experience, projects, education, and
//   meta details consumed by resume components.
// - No internal state: React components read and render this data directly.
//
// Accessibility
// - Keeping data structured enables semantic rendering (lists, headings, dl/dt).
// - Ensure strings include meaningful labels (e.g., role, timeframe) for screen
//   readers.
//
// How to customize
// - Add fields (e.g., metrics, links) and update renderers to display them.
// - Localize strings or swap datasets for different audiences/markets.
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// content/resumeData.js
// Structured data that powers resume pages/sections.
// -----------------------------------------------------------------------------

// src/content/resumeData.js

export const SECTION_ITEMS = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education-certifications", label: "Education" },
];

export const HERO = {
  roleTag: "Principal Product & UX Design",
  name: "Sergio Antezana",
  blurb: [
    "Product Designer & UX Architect · Systems & Strategy · Multi-team UX Leadership",
    "I lead UX strategy, design systems, and cross-team patterns that raise UX maturity and make multi-team delivery more predictable. I work at the seams between product, engineering, and operations so teams can ship intuitive tools instead of one-off screens.",
  ],
};

export const SUMMARY = [
  "Principal-level Product Designer and UX Architect with 15+ years leading UX strategy, design systems, and research-driven improvements across large, complex federal and enterprise platforms. I focus on system-level UX, reusable patterns, and the organizational structures that make good design repeatable instead of one-off efforts.",
  "I lead cross-functional work where product, engineering, and UX intersect: clarifying problems, defining UX roadmaps, and turning constraints into scalable interaction patterns. I am at my best in Principal, Staff, and Lead environments where I can both set direction and ship hands-on design that delivery teams can build, extend, and maintain.",
];

export const RECRUITER_ESSENTIALS = {
  email: "santezana@nayas.com",
  phone: "571-482-8257",
  location: "DC Area",
  pronouns: "he / him",
  timeZoneLabel: "Eastern Time (ET)",
  citizenship: "US Citizen",
  veteranStatus: "Not a veteran",
  raceEthnicity: "Hispanic / Latino",
  clearanceStatus: "Top Secret · SCI Eligibility",
};

export const SKILLS = [
  {
    title: "Design Leadership & Strategy",
    text: "Vision and Roadmapping · Portfolio UX Direction · UX Governance · Mentorship and Coaching · Cross-Functional Alignment · Accessibility Advocacy",
  },
  {
    title: "Design Systems & Accessibility",
    text: "Figma · Material Design · MUI · Design Tokens · Component Lifecycle Management · WCAG 2.2 / Section 508 · Trusted Tester Certified",
  },
  {
    title: "AI-Enhanced Design Workflow",
    text: "ChatGPT · Gemini · Figma AI · Replit · Generative AI for UX Writing and Ideation · Low-Code / No-Code Prototyping",
  },
  {
    title: "Technical Collaboration",
    text: "HTML/CSS/JS (Responsive Prototyping) · Design Tokens Integration · Jira · Confluence",
  },
  {
    title: "Research & UXOps",
    text: "Information Architecture · Usability Testing · Human-AI Interaction · Agile UX · UXOps Frameworks",
  },
];

export const META = {
  title: "Product Designer & UX Architect",
  subtitle: "Systems, UX strategy, design ops, accessibility",
  openTo: "Open to Principal, Staff, and Lead Product / UX roles",
  location: "Washington, DC metro (remote-first)",
  email: "santezana@nayas.com",
  linkedin: "https://www.linkedin.com/in/santezana/",
  github: "https://github.com/sergiullas",
  pronouns: "he / him",
  linkedinLabel: "linkedin.com/in/santezana",
  githubLabel: "github.com/sergiullas",
};

export const EXPERIENCE = {
  company: "Booz Allen Hamilton — Washington, DC",
  tenure: "2009 – Present",
  currentEraLabel: "Current era: UX Strategy & Systems Leadership",
  eras: [
    {
      id: "era1",
      title: "Era 1 — Foundations (Web & Early UX)",
      subtitle: "Web Designer → Usability Specialist",
      tags: [
        "Visual Design",
        "HTML/CSS",
        "Front-end Collaboration",
        "Usability Testing",
      ],
      intro:
        "Started as a visual and web designer supporting early federal systems, focusing on clean layouts, foundational UX practices, and learning how to ship production-ready UI in partnership with engineers.",
      bullets: [
        "Built and refined UI for DHS and ODNI applications, translating requirements into usable page layouts and navigation.",
        "Ran usability reviews and worked with teams to fix pain points such as unclear labels, cluttered layouts, and inconsistent flows.",
        "Helped standardize early UI patterns (buttons, tables, forms) that reduced ad-hoc one-off screens and made future changes easier to implement.",
      ],
    },
    {
      id: "era2",
      title: "Era 2 — Human Factors & Applied Research",
      subtitle: "Human Factors Specialist → Human Factors Scientist, Lead",
      tags: [
        "Human Factors",
        "Usability Studies",
        "Task Analysis",
        "Cognitive Load",
      ],
      intro:
        "Moved into human factors, bringing a more analytical, evidence-based lens to UX decisions for complex intelligence and defense systems. Work focused on making high-risk workflows safer, more efficient, and easier to learn.",
      bullets: [
        "Led usability evaluations, task analyses, and performance studies to understand how analysts and operators actually used mission-critical tools.",
        "Turned research findings into clear, prioritized UX recommendations that guided roadmap decisions and design changes.",
        "Partnered with product and engineering leads to reduce cognitive load, streamline workflows, and mitigate error-prone interactions in secure environments.",
        "Established repeatable research practices that teams could reuse instead of treating each study as a one-off effort.",
      ],
    },
    {
      id: "era3",
      title: "Era 3 — UX Design & Product Execution",
      subtitle: "UX Designer → UX Designer, Lead",
      tags: [
        "End-to-End UX",
        "Interaction Design",
        "Complex Systems",
        "Agile Delivery",
      ],
      intro:
        "Shifted into end-to-end product design, owning UX for large, data-heavy federal platforms. Acted as a bridge between product owners and multiple engineering teams to make complex workflows understandable and buildable.",
      bullets: [
        "Designed flows, wireframes, and detailed interaction patterns for complex search, workflow, and reporting tools used across multiple programs.",
        "Worked closely with technical leads to translate constraints into pragmatic UX decisions, ensuring designs were feasible and could be delivered incrementally in Agile environments.",
        "Introduced reusable patterns (tables, filters, detail views, error handling) that reduced design and engineering rework across related products.",
        "Mentored designers on structuring problem spaces, documenting decisions, and communicating clearly with non-design partners.",
      ],
    },
    {
      id: "era4",
      title: "Era 4 — UX Strategy & Systems Leadership",
      subtitle: "UX Strategist, Lead (Principal-scope)",
      tags: [
        "Design Strategy",
        "Design Systems",
        "Org-level UX",
        "Cross-functional Leadership",
      ],
      intro:
        "Currently serve as the principal UX leader for multi-year, multi-team programs, owning UX strategy, design systems, and cross-program UX standards. Bring structure to ambiguous portfolios, align product and engineering leaders around shared UX direction, and scale practices that make good design repeatable across teams.",
      bullets: [
        "Defined and rolled out UX frameworks and guidelines used across major FBI and DOJ programs, giving teams across multiple programs shared patterns instead of designing from scratch for each screen.",
        "Led the shift toward design-system thinking (tokens, shared components, interaction patterns), reducing UX and engineering rework and making it easier to ship accessible, consistent interfaces.",
        "Partnered with product leads to turn high-level mission and business goals into clear UX objectives, roadmaps, and design priorities for delivery teams.",
        "Influenced major system and API decisions by framing trade-offs in terms of analyst workflows, operational risk, and long-term maintainability, not only short-term feature delivery.",
        "Provided coaching and design direction to UX practitioners across programs, helping them deliver consistent experiences while still supporting team autonomy.",
      ],
    },
  ],
  keyPrograms: [
    {
      org: "Federal Bureau of Investigation (FBI)",
      programs: "Chameleon, DELTA, NGNCP, EPAS",
    },
    {
      org: "Department of Justice (DOJ)",
      programs: "USTP",
    },
    {
      org: "Defense Intelligence Agency (DIA)",
      programs: "JIDO, OSCAR, COUGAR, Black Forest, CRATE",
    },
    {
      org: "Department of Homeland Security (DHS)",
      programs: "SEVIS II, ICE CMM, RAMP",
    },
    {
      org: "U.S. EUCOM / Joint Analysis Center",
      programs: "IPAS",
    },
    {
      org: "Director of National Intelligence (ODNI)",
      programs: "DRAMRS",
    },
    {
      org: "Food and Drug Administration (FDA)",
      programs: "CDRH",
    },
  ],
};

export const PROJECTS = [
  {
    title: "Enterprise Workflow Platform (2023–2025)",
    description:
      "Designed the UX for a low-code platform used to build forms, workflows, and dashboards. Focused on clarity, reusable patterns, and reducing the amount of custom work engineering teams had to maintain, helping teams move faster by giving them simple, proven structures to start from.",
  },
  {
    title: "Accessibility Modernization Program (2016–2019)",
    description:
      "Improved usability and accessibility across 12 DOJ applications. Created shared components that teams could reuse instead of rebuilding from scratch, and supported testing and refinement work that reduced support issues and made the products easier to use.",
  },
  {
    title: "Intelligence Community Systems (2014–2018)",
    description:
      "Designed UI patterns and workflows for several intelligence and defense applications. Worked with multiple teams to bring consistency to large systems and improve how information was presented to analysts, and helped introduce accessibility and UX standards that other groups later adopted.",
  },
  {
    title: "AI-Driven Prototyping Pilot (2023)",
    description:
      "Explored how tools such as Figma AI and ChatGPT could speed up early design work. Proved out approaches that reduced manual prototyping effort and helped teams get ideas in front of stakeholders earlier.",
  },
];
