"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  GitCommitHorizontal,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  FaGithub,
  FaGitAlt,
} from "react-icons/fa";

import { PageContainer } from "@/components/layout/page-container";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectFilter = "all" | ProjectCategory;

type GitHubActivity = {
  id: string;
  type: string;
  repository: string;
  createdAt: string;
};

type PopularRepository = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  updatedAt: string;
};

type ActivityDay = {
  date: string;
  count: number;
};

type GitHubData = {
  profile: {
    username: string;
    name: string | null;
    avatarUrl: string;
    profileUrl: string;
    bio: string | null;
    publicRepositories: number;
    followers: number;
    following: number;
  };
  statistics: {
    originalRepositories: number;
    totalStars: number;
    recentPublicEvents: number;
    recentPushEvents: number;
    recentActivityStreak: number;
    mostActiveDay: ActivityDay | null;
  };
  activityByDay: ActivityDay[];
  recentActivity: GitHubActivity[];
  popularRepositories: PopularRepository[];
  generatedAt: string;
};

const filters: {
  id: ProjectFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "full-stack",
    label: "Full-stack",
  },
  {
    id: "ai",
    label: "AI",
  },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilter>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <div className="overflow-hidden">
      <ProjectsHero />

      <section className="border-t border-white/10 py-20 sm:py-24 lg:py-32">
        <PageContainer>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I am building"
            description="A collection of frontend, full-stack and AI-focused projects that demonstrate my learning and problem-solving journey."
          />

          <ProjectFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -16,
              }}
              transition={{
                duration: 0.35,
              }}
              className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </PageContainer>
      </section>

      <GitHubStatistics />
    </div>
  );
}

function ProjectsHero() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32">
      <ProjectsBackground />

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
            Ideas transformed into software
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
            Building projects that{" "}
            <span className="text-signature-gradient">
              solve and inspire
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
            These projects represent my practical development
            journey across Java, full-stack web development,
            modern frontend engineering and AI-powered products.
          </motion.p>
        </div>
      </PageContainer>
    </section>
  );
}

function ProjectFilters({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.5,
      }}
      transition={{
        duration: 0.55,
      }}
      className="mt-10 flex flex-wrap justify-center gap-3"
    >
      {filters.map((filter) => {
        const isActive = filter.id === activeFilter;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-300",
              isActive
                ? "border-cyan-400/40 bg-signature-gradient text-white shadow-glow"
                : "border-white/10 bg-white/5 text-muted-foreground hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const hasLiveUrl = project.liveUrl.trim().length > 0;
  const hasGitHubUrl =
    project.githubUrl.trim().length > 0;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
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
        y: -8,
      }}
      className="surface-card group flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div
        className={cn(
          "relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br",
          project.gradient
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <motion.div
          whileHover={{
            scale: 1.08,
            rotate: 2,
          }}
          transition={{
            duration: 0.35,
          }}
          className="relative flex size-24 items-center justify-center rounded-3xl border border-white/15 bg-black/20 text-white shadow-2xl backdrop-blur-xl"
        >
          <span className="font-display text-3xl font-bold">
            {String(project.id).padStart(2, "0")}
          </span>
        </motion.div>

        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          {project.featured && (
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-xl">
              Featured
            </span>
          )}

          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-xl">
            {project.status}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-3 bg-black/50 p-5 backdrop-blur-xl transition-transform duration-300 group-hover:translate-y-0">
          {hasGitHubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <FaGithub className="size-5" />
            </a>
          )}

          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open live demo of ${project.title}`}
              className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ExternalLink className="size-5" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              {formatCategory(project.category)}
            </p>

            <h3 className="mt-2 font-display text-2xl font-semibold">
              {project.title}
            </h3>
          </div>

          <ArrowRight className="mt-1 size-5 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300" />
        </div>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {project.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/75"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {hasGitHubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              <FaGithub className="size-4" />
              Source
            </a>
          ) : (
            <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-muted-foreground">
              Source coming soon
            </span>
          )}

          {hasLiveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-signature-gradient px-4 py-2.5 text-sm font-medium text-white shadow-glow transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              <ExternalLink className="size-4" />
              Live demo
            </a>
          ) : (
            <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-muted-foreground">
              Demo coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function GitHubStatistics() {
  const [githubData, setGitHubData] =
    useState<GitHubData | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  async function loadGitHubData() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/github", {
        cache: "no-store",
      });

      const result = (await response.json()) as
        | GitHubData
        | { error: string };

      if (!response.ok || "error" in result) {
        throw new Error(
          "error" in result
            ? result.error
            : "Unable to load GitHub statistics."
        );
      }

      setGitHubData(result);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unable to load GitHub statistics.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadGitHubData();
  }, []);

  return (
    <section className="border-t border-white/10 bg-white/[0.02] py-20 sm:py-24 lg:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="Live development activity"
          title="GitHub statistics"
          description="Live public information loaded from GitHub through a server-side API route."
        />

        {isLoading && <GitHubLoadingState />}

        {!isLoading && error && (
          <GitHubErrorState
            message={error}
            onRetry={loadGitHubData}
          />
        )}

        {!isLoading && !error && githubData && (
          <GitHubDashboard data={githubData} />
        )}
      </PageContainer>
    </section>
  );
}

function GitHubLoadingState() {
  return (
    <div className="surface-card mx-auto mt-12 flex max-w-xl flex-col items-center rounded-3xl p-10 text-center">
      <LoaderCircle className="size-9 animate-spin text-cyan-300" />

      <p className="mt-5 font-display text-xl font-semibold">
        Loading GitHub activity
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        Fetching current public profile and repository data.
      </p>
    </div>
  );
}

function GitHubErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="surface-card mx-auto mt-12 max-w-2xl rounded-3xl p-8 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
        <AlertCircle className="size-6" />
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold">
        GitHub data is unavailable
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-signature-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition-opacity hover:opacity-90"
      >
        <RefreshCw className="size-4" />
        Try again
      </button>
    </div>
  );
}

function GitHubDashboard({
  data,
}: {
  data: GitHubData;
}) {
  const statistics = [
    {
      label: "Public repositories",
      value: data.profile.publicRepositories,
      icon: FaGitAlt,
    },
    {
      label: "Total public stars",
      value: data.statistics.totalStars,
      icon: Star,
    },
    {
      label: "Followers",
      value: data.profile.followers,
      icon: Users,
    },
    {
      label: "Recent public events",
      value: data.statistics.recentPublicEvents,
      icon: Activity,
    },
  ];

  return (
    <div className="mt-12 space-y-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="surface-card rounded-3xl p-6 sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
           <Image
  src={data.profile.avatarUrl}
  alt={`${data.profile.username} GitHub avatar`}
  width={80}
  height={80}
  className="size-16 rounded-2xl border border-white/10 object-cover sm:size-20"
/>

            <div>
              <p className="font-display text-2xl font-bold">
                {data.profile.name ??
                  data.profile.username}
              </p>

              <p className="mt-1 text-sm text-cyan-300">
                @{data.profile.username}
              </p>

              {data.profile.bio && (
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  {data.profile.bio}
                </p>
              )}
            </div>
          </div>

          <a
            href={data.profile.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-signature-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            <FaGithub className="size-4" />
            View GitHub
          </a>
        </div>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic, index) => {
          const Icon = statistic.icon;

          return (
            <motion.div
              key={statistic.label}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
              }}
              className="surface-card rounded-3xl p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
                <Icon className="size-5" />
              </div>

              <p className="mt-6 font-display text-3xl font-bold text-signature-gradient">
                {statistic.value}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {statistic.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ActivityGraph data={data} />
        <RecentActivityList
          activity={data.recentActivity}
        />
      </div>

      <GitHubImportantNote generatedAt={data.generatedAt} />
    </div>
  );
}

function ActivityGraph({
  data,
}: {
  data: GitHubData;
}) {
  const maximumCount = Math.max(
    ...data.activityByDay.map((day) => day.count),
    1
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="surface-card rounded-3xl p-6 sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold">
            Recent activity pattern
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Public GitHub events grouped by day.
          </p>
        </div>

        <div className="flex gap-4">
          <MiniStatistic
            label="Recent streak"
            value={`${data.statistics.recentActivityStreak} days`}
          />

          <MiniStatistic
            label="Push events"
            value={String(
              data.statistics.recentPushEvents
            )}
          />
        </div>
      </div>

      {data.activityByDay.length > 0 ? (
        <div className="mt-8 flex h-44 items-end gap-2">
          {data.activityByDay.map((day) => {
            const height =
              Math.max(
                (day.count / maximumCount) * 100,
                8
              );

            return (
              <div
                key={day.date}
                className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="pointer-events-none absolute -mt-12 hidden rounded-lg border border-white/10 bg-background px-2 py-1 text-xs shadow-xl group-hover:block">
                  {day.count} events
                </div>

                <motion.div
                  initial={{
                    height: 0,
                  }}
                  whileInView={{
                    height: `${height}%`,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.65,
                  }}
                  className="w-full min-w-2 rounded-t-md bg-signature-gradient"
                />

                <span className="hidden text-[10px] text-muted-foreground sm:block">
                  {formatShortDate(day.date)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-muted-foreground">
          No recent public activity was returned.
        </div>
      )}

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-cyan-300">
            <CalendarDays className="size-4" />

            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Most-active recent day
            </span>
          </div>

          <p className="mt-3 font-display text-lg font-semibold">
            {data.statistics.mostActiveDay
              ? formatLongDate(
                  data.statistics.mostActiveDay.date
                )
              : "No recent data"}
          </p>

          {data.statistics.mostActiveDay && (
            <p className="mt-1 text-sm text-muted-foreground">
              {
                data.statistics.mostActiveDay
                  .count
              }{" "}
              public events
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-violet-300">
            <GitCommitHorizontal className="size-4" />

            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Original repositories
            </span>
          </div>

          <p className="mt-3 font-display text-lg font-semibold">
            {
              data.statistics
                .originalRepositories
            }
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Public forks are excluded.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function RecentActivityList({
  activity,
}: {
  activity: GitHubActivity[];
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="surface-card rounded-3xl p-6 sm:p-8"
    >
      <p className="font-display text-xl font-semibold">
        Latest public activity
      </p>

      <p className="mt-2 text-sm text-muted-foreground">
        Most recently returned events from GitHub.
      </p>

      <div className="mt-6 space-y-3">
        {activity.length > 0 ? (
          activity.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <Activity className="size-4" />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {item.type}
                  </p>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {item.repository}
                  </p>

                  <p className="mt-2 text-xs text-white/35">
                    {formatRelativeTime(
                      item.createdAt
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-muted-foreground">
            No recent public events were returned.
          </div>
        )}
      </div>
    </motion.div>
  );
}

function GitHubImportantNote({
  generatedAt,
}: {
  generatedAt: string;
}) {
  return (
    <div className="rounded-2xl border border-amber-300/15 bg-amber-300/5 p-5">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-300" />

        <div>
          <p className="text-sm font-semibold text-amber-200">
            About these statistics
          </p>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Activity streak, most-active day and event counts
            are calculated from recent public events returned by
            GitHub. They are not lifetime contribution-calendar
            totals and do not include private activity.
          </p>

          <p className="mt-2 text-xs text-white/35">
            Data generated{" "}
            {formatRelativeTime(generatedAt)}.
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniStatistic({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="text-right">
      <p className="font-display text-lg font-semibold text-cyan-300">
        {value}
      </p>

      <p className="text-xs text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
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
        amount: 0.4,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

function ProjectsBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
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
          y: [0, 65, 0],
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

function formatCategory(
  category: ProjectCategory
): string {
  const categoryLabels: Record<
    ProjectCategory,
    string
  > = {
    frontend: "Frontend",
    "full-stack": "Full-stack",
    ai: "Artificial Intelligence",
  };

  return categoryLabels[category];
}

function formatShortDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatLongDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatRelativeTime(date: string): string {
  const dateValue = new Date(date).getTime();
  const currentValue = Date.now();

  const differenceInSeconds = Math.round(
    (dateValue - currentValue) / 1000
  );

  const formatter = new Intl.RelativeTimeFormat(
    "en",
    {
      numeric: "auto",
    }
  );

  const absoluteSeconds = Math.abs(
    differenceInSeconds
  );

  if (absoluteSeconds < 60) {
    return formatter.format(
      differenceInSeconds,
      "second"
    );
  }

  const differenceInMinutes = Math.round(
    differenceInSeconds / 60
  );

  if (Math.abs(differenceInMinutes) < 60) {
    return formatter.format(
      differenceInMinutes,
      "minute"
    );
  }

  const differenceInHours = Math.round(
    differenceInMinutes / 60
  );

  if (Math.abs(differenceInHours) < 24) {
    return formatter.format(
      differenceInHours,
      "hour"
    );
  }

  const differenceInDays = Math.round(
    differenceInHours / 24
  );

  return formatter.format(
    differenceInDays,
    "day"
  );
}