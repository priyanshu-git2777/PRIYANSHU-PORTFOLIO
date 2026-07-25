"use client";

import { useState } from "react";
import {
  Braces,
  Code2,
  Database,
  Layers3,
  Sparkles,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostman,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";



import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

type SkillCategory =
  | "frontend"
  | "backend"
  | "programming"
  | "database"
  | "tools";

type SkillItem = {
  name: string;
  level: number;
  experience: string;
  description: string;
  projects: string;
  icon: IconType;
};

type CategoryItem = {
  id: SkillCategory;
  label: string;
  description: string;
  icon: typeof Code2;
};

const categories: CategoryItem[] = [
  {
    id: "frontend",
    label: "Frontend",
    description:
      "Technologies I use to build responsive and interactive interfaces.",
    icon: Layers3,
  },
  {
    id: "backend",
    label: "Backend",
    description:
      "Tools I use for APIs, server logic and application functionality.",
    icon: TerminalSquare,
  },
  {
    id: "programming",
    label: "Programming",
    description:
      "Languages I use for problem-solving, development and DSA.",
    icon: Braces,
  },
  {
    id: "database",
    label: "Database",
    description:
      "Databases I use to store, organise and retrieve application data.",
    icon: Database,
  },
  {
    id: "tools",
    label: "Tools",
    description:
      "Development tools that support my coding and project workflow.",
    icon: Wrench,
  },
];

const skills: Record<SkillCategory, SkillItem[]> = {
  frontend: [
    {
      name: "HTML",
      level: 90,
      experience: "2+ years learning",
      description:
        "Semantic page structure, forms, accessibility basics and reusable layouts.",
      projects: "Portfolio websites and responsive web pages",
      icon: FaHtml5,
    },
    {
      name: "CSS",
      level: 85,
      experience: "2+ years learning",
      description:
        "Responsive layouts, Flexbox, Grid, animations and component styling.",
      projects: "Portfolio UI and frontend practice projects",
      icon: FaCss3Alt,
    },
    {
      name: "JavaScript",
      level: 80,
      experience: "1+ year learning",
      description:
        "DOM manipulation, events, arrays, objects, asynchronous programming and APIs.",
      projects: "Interactive frontend applications",
      icon: SiJavascript,
    },
    {
      name: "TypeScript",
      level: 68,
      experience: "Currently improving",
      description:
        "Type-safe React components, interfaces, reusable props and safer application code.",
      projects: "Next.js portfolio",
      icon: SiTypescript,
    },
    {
      name: "React",
      level: 78,
      experience: "1+ year learning",
      description:
        "Functional components, props, state, hooks and reusable user interfaces.",
      projects: "DevFlow AI frontend and portfolio",
      icon: FaReact,
    },
    {
      name: "Next.js",
      level: 65,
      experience: "Currently improving",
      description:
        "App Router, layouts, pages, metadata, optimised images and server routes.",
      projects: "Developer portfolio",
      icon: SiNextdotjs,
    },
    {
      name: "Tailwind CSS",
      level: 76,
      experience: "1+ year learning",
      description:
        "Utility-first styling, responsive classes, design systems and reusable UI patterns.",
      projects: "Portfolio and dashboard interfaces",
      icon: SiTailwindcss,
    },
  ],

  backend: [
    {
      name: "Node.js",
      level: 70,
      experience: "1+ year learning",
      description:
        "Server-side JavaScript, npm packages, file structure and application logic.",
      projects: "DevFlow AI backend",
      icon: FaNodeJs,
    },
    {
      name: "Express.js",
      level: 68,
      experience: "1+ year learning",
      description:
        "REST APIs, middleware, routing, request handling and backend structure.",
      projects: "MERN application APIs",
      icon: SiExpress,
    },
    {
      name: "Next.js API Routes",
      level: 58,
      experience: "Currently learning",
      description:
        "Route handlers for forms, API integrations and backend functionality.",
      projects: "Portfolio chat and visitor counter",
      icon: SiNextdotjs,
    },
  ],

  programming: [
    {
      name: "Java",
      level: 84,
      experience: "Primary language",
      description:
        "Object-oriented programming, collections, exceptions, arrays and DSA practice.",
      projects: "Academic programs and LeetCode solutions",
      icon: FaJava,
    },
    {
      name: "JavaScript",
      level: 80,
      experience: "1+ year learning",
      description:
        "Frontend logic, functions, objects, classes, events and asynchronous operations.",
      projects: "Frontend and MERN projects",
      icon: SiJavascript,
    },
    {
      name: "TypeScript",
      level: 68,
      experience: "Currently improving",
      description:
        "Strongly typed JavaScript for scalable React and Next.js development.",
      projects: "Developer portfolio",
      icon: SiTypescript,
    },
  ],

  database: [
    {
      name: "MongoDB",
      level: 70,
      experience: "1+ year learning",
      description:
        "Documents, collections, CRUD operations, MongoDB Atlas and Compass.",
      projects: "DevFlow AI database",
      icon: SiMongodb,
    },
    {
      name: "MySQL",
      level: 60,
      experience: "Academic and project use",
      description:
        "Tables, SQL queries, filtering, joins and basic relational database design.",
      projects: "Database practice applications",
      icon: SiMysql,
    },
  ],

  tools: [
    {
      name: "Git",
      level: 72,
      experience: "Regular project use",
      description:
        "Version control, commits, branches and project history management.",
      projects: "Portfolio and MERN projects",
      icon: FaGitAlt,
    },
    {
      name: "GitHub",
      level: 75,
      experience: "Regular project use",
      description:
        "Repositories, code hosting, README files and project collaboration.",
      projects: "Portfolio and coding repositories",
      icon: FaGithub,
    },
    {
      name: "VS Code",
      level: 88,
      experience: "Daily development tool",
      description:
        "Extensions, integrated terminal, debugging and project organisation.",
      projects: "All development projects",
      icon: VscVscode,
    },
    {
      name: "Postman",
      level: 65,
      experience: "Backend testing",
      description:
        "Testing APIs, sending requests and inspecting backend responses.",
      projects: "DevFlow AI API testing",
      icon: SiPostman,
    },
  ],
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("frontend");

  const selectedCategory = categories.find(
    (category) => category.id === activeCategory
  );

  return (
    <div className="overflow-hidden">
      <SkillsHero />

      <section className="border-t border-white/10 py-20 sm:py-24 lg:py-32">
        <PageContainer>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Technical toolkit
            </p>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Explore my skills by category
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
              Select a category to see the technologies I am
              learning and using in projects.
            </p>
          </motion.div>

          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="mb-8 text-center">
                  <h3 className="font-display text-2xl font-bold">
                    {selectedCategory?.label}
                  </h3>

                  <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                    {selectedCategory?.description}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {skills[activeCategory].map(
                    (skill, index) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={index}
                      />
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </PageContainer>
      </section>

      <SkillsSummary />
    </div>
  );
}

function SkillsHero() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32">
      <SkillsBackground />

      <PageContainer>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl"
          >
            <Sparkles className="size-4 text-cyan-300" />
            Skills and technologies
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
            }}
            className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
          >
            Tools I use to{" "}
            <span className="text-signature-gradient">
              build and solve
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.2,
            }}
            className="mx-auto mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            My current focus is Java and data structures,
            full-stack web development and building projects that
            strengthen both my technical and problem-solving
            abilities.
          </motion.p>
        </div>
      </PageContainer>
    </section>
  );
}

function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: SkillCategory;
  onCategoryChange: (category: SkillCategory) => void;
}) {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-3">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = category.id === activeCategory;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300",
              isActive
                ? "border-cyan-400/40 bg-signature-gradient text-white shadow-glow"
                : "border-white/10 bg-white/5 text-muted-foreground hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

function SkillCard({
  skill,
  index,
}: {
  skill: SkillItem;
  index: number;
}) {
  const Icon = skill.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -7,
      }}
      className="surface-card group rounded-3xl p-6"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="flex size-13 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
            <Icon />
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold">
              {skill.name}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {skill.experience}
            </p>
          </div>
        </div>

        <span className="text-sm font-semibold text-cyan-300">
          {skill.level}%
        </span>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${skill.level}%`,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.9,
            delay: index * 0.06,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-signature-gradient"
        />
      </div>

      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        {skill.description}
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
          Related work
        </p>

        <p className="mt-2 text-sm text-foreground/80">
          {skill.projects}
        </p>
      </div>
    </motion.article>
  );
}

function SkillsSummary() {
  const summaryItems = [
    {
      value: "5",
      label: "Skill categories",
    },
    {
      value: "15+",
      label: "Technologies and tools",
    },
    {
      value: "Java",
      label: "Primary DSA language",
    },
    {
      value: "Full Stack",
      label: "Current development focus",
    },
  ];

  return (
    <section className="border-t border-white/10 bg-white/[0.02] py-20 sm:py-24">
      <PageContainer>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {summaryItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="surface-card rounded-3xl p-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-signature-gradient">
                {item.value}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function SkillsBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 45, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-8 size-[30rem] rounded-full bg-violet-600/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
          scale: [1, 0.92, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-1/3 size-[28rem] rounded-full bg-cyan-500/10 blur-3xl"
      />
    </div>
  );
}