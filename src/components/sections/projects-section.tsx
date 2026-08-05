"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { PageContainer } from "@/components/layout/page-container";
import {
  projects,
  type ProjectCategory,
} from "@/data/projects";

const categories: ProjectCategory[] = [
  "All",
  "Frontend",
  "Full-stack",
  "AI",
  "DSA",
];

export function ProjectsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  function scrollProjects(direction: "left" | "right") {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const firstCard = slider.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 380;
    const scrollDistance = cardWidth + 24;

    slider.scrollBy({
      left:
        direction === "left"
          ? -scrollDistance
          : scrollDistance,
      behavior: "smooth",
    });
  }

  function handleCategoryChange(category: ProjectCategory) {
    setActiveCategory(category);

    requestAnimationFrame(() => {
      sliderRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    });
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <PageContainer>
        <div className="relative z-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Selected Work
              </p>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Projects I am building
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                Explore my frontend, full-stack, Java and AI-focused
                projects. Use the arrow buttons or swipe horizontally
                to view more projects.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollProjects("left")}
                aria-label="Show previous project"
                className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-cyan-400/10"
              >
                <ArrowLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={() => scrollProjects("right")}
                aria-label="Show next project"
                className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-cyan-400/10"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={
                    isActive
                      ? "rounded-full bg-signature-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
                      : "rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div
            ref={sliderRef}
            className="scrollbar-hide mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="surface-card group min-w-[88%] snap-start overflow-hidden rounded-3xl border border-white/10 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 sm:min-w-[430px] lg:min-w-[390px]"
              >
                <div
                  className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px]"
                  />

                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {project.featured && (
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        Featured
                      </span>
                    )}

                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {project.status}
                    </span>
                  </div>

                  <div className="relative flex size-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-3xl font-bold text-white shadow-2xl backdrop-blur-md transition duration-300 group-hover:scale-110">
                    {String(project.id).padStart(2, "0")}
                  </div>
                </div>

                <div className="flex min-h-[360px] flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                    {project.category}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-white">
                    {project.title}
                  </h2>

                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                    >
                      <FaGithub className="size-4" />
                      Source
                    </Link>

                    {project.demoUrl ? (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-signature-gradient px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Live demo
                        <ExternalLink className="size-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-muted-foreground">
                        Demo coming soon
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-muted-foreground">
                No projects are available in this category yet.
              </p>
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  );
}