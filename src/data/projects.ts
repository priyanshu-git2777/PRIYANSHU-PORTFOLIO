export type ProjectCategory =
  | "frontend"
  | "full-stack"
  | "ai";

export type Project = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  status: "Completed" | "In Progress";
  gradient: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "DevFlow AI",
    shortDescription:
      "An AI-powered workspace designed to help developers manage tasks, code and project activity.",
    fullDescription:
      "A full-stack developer workspace with project management, dashboard components, authentication-ready architecture and planned AI assistance.",
    category: "full-stack",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/priyanshu-git2777",
    liveUrl: "",
    featured: true,
    status: "In Progress",
    gradient:
      "from-violet-600/45 via-blue-600/25 to-cyan-500/35",
  },
  {
    id: 2,
    title: "Developer Portfolio",
    shortDescription:
      "An animated portfolio built to present my projects, technical abilities and development journey.",
    fullDescription:
      "A responsive developer portfolio featuring Motion animations, reusable components, project filtering, GitHub statistics and modern visual effects.",
    category: "frontend",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "shadcn/ui",
    ],
    githubUrl: "https://github.com/priyanshu-git2777",
    liveUrl: "",
    featured: true,
    status: "In Progress",
    gradient:
      "from-cyan-500/40 via-blue-600/25 to-violet-600/35",
  },
  {
    id: 3,
    title: "AI Portfolio Assistant",
    shortDescription:
      "A conversational assistant that answers visitors’ questions about my skills and projects.",
    fullDescription:
      "An embedded portfolio assistant with contextual responses, API integration, graceful fallback answers and WhatsApp handoff support.",
    category: "ai",
    technologies: [
      "Next.js",
      "TypeScript",
      "LLM API",
      "Route Handlers",
    ],
    githubUrl: "https://github.com/priyanshu-git2777",
    liveUrl: "",
    featured: false,
    status: "In Progress",
    gradient:
      "from-fuchsia-600/35 via-violet-600/30 to-blue-600/35",
  },
  {
    id: 4,
    title: "Task Management Dashboard",
    shortDescription:
      "A responsive dashboard concept for organising tasks, deadlines and development progress.",
    fullDescription:
      "A reusable dashboard interface with navigation, statistics, task cards, responsive layouts and interactive UI components.",
    category: "frontend",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/priyanshu-git2777",
    liveUrl: "",
    featured: false,
    status: "Completed",
    gradient:
      "from-emerald-500/30 via-cyan-500/25 to-blue-600/35",
  },
  {
    id: 5,
    title: "MERN Notes Application",
    shortDescription:
      "A full-stack notes application with API routes, database operations and reusable components.",
    fullDescription:
      "A MERN application demonstrating CRUD operations, Express routes, MongoDB storage and responsive React components.",
    category: "full-stack",
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
    ],
    githubUrl: "https://github.com/priyanshu-git2777",
    liveUrl: "",
    featured: false,
    status: "Completed",
    gradient:
      "from-green-500/30 via-emerald-500/20 to-cyan-500/35",
  },
  {
    id: 6,
    title: "Java DSA Solutions",
    shortDescription:
      "A growing collection of Java solutions for data structures, algorithms and coding problems.",
    fullDescription:
      "A repository containing Java implementations and problem solutions covering arrays, linked lists, trees, graphs and dynamic programming.",
    category: "full-stack",
    technologies: [
      "Java",
      "DSA",
      "LeetCode",
      "Problem Solving",
    ],
    githubUrl: "https://github.com/priyanshu-git2777",
    liveUrl: "",
    featured: false,
    status: "In Progress",
    gradient:
      "from-orange-500/30 via-red-500/20 to-violet-600/30",
  },
];