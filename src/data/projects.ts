export type ProjectCategory =
  | "All"
  | "Frontend"
  | "Full-stack"
  | "AI"
  | "DSA";

export type ProjectStatus = "Completed" | "In Progress";

export type Project = {
  id: number;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  sourceUrl: string;
  demoUrl?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "DevFlow AI",
    category: "Full-stack",
    description:
      "An AI-powered developer workspace designed to help developers manage projects, tasks, code and development activity.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    status: "In Progress",
    featured: true,
    sourceUrl: "https://github.com/priyanshu-git2777",
    demoUrl: "",
    gradient: "from-violet-700 via-indigo-700 to-cyan-700",
  },
  {
    id: 2,
    title: "Developer Portfolio",
    category: "Frontend",
    description:
      "An animated developer portfolio created to present my projects, technical abilities and software engineering journey.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "In Progress",
    featured: true,
    sourceUrl: "https://github.com/priyanshu-git2777",
    demoUrl: "",
    gradient: "from-cyan-700 via-blue-700 to-violet-700",
  },
  {
    id: 3,
    title: "AI Portfolio Assistant",
    category: "AI",
    description:
      "A conversational assistant that answers visitors' questions about my skills, projects and development experience.",
    technologies: ["Next.js", "TypeScript", "LLM API", "RAG"],
    status: "In Progress",
    featured: false,
    sourceUrl: "https://github.com/priyanshu-git2777",
    demoUrl: "",
    gradient: "from-fuchsia-700 via-purple-700 to-indigo-700",
  },
  {
    id: 4,
    title: "Task Management Dashboard",
    category: "Frontend",
    description:
      "A responsive dashboard for organizing tasks, deadlines and development progress with a clean user experience.",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    status: "Completed",
    featured: false,
    sourceUrl: "https://github.com/priyanshu-git2777",
    demoUrl: "",
    gradient: "from-emerald-700 via-cyan-700 to-blue-700",
  },
  {
    id: 5,
    title: "MERN Notes Application",
    category: "Full-stack",
    description:
      "A full-stack notes application with API routes, database operations, authentication and reusable components.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    status: "Completed",
    featured: false,
    sourceUrl: "https://github.com/priyanshu-git2777",
    demoUrl: "",
    gradient: "from-green-800 via-emerald-700 to-cyan-700",
  },
  {
    id: 6,
    title: "Java DSA Solutions",
    category: "DSA",
    description:
      "A growing collection of Java solutions for data structures, algorithms and coding interview problems.",
    technologies: ["Java", "DSA", "LeetCode", "Problem Solving"],
    status: "In Progress",
    featured: false,
    sourceUrl: "https://github.com/priyanshu-git2777",
    demoUrl: "",
    gradient: "from-orange-800 via-red-800 to-purple-800",
  },
];