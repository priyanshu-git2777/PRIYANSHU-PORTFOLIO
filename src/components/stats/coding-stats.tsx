"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "motion/react";
import {
  Activity,
  BookOpen,
  CheckCircle2,
  CircleDot,
  Code2,
  ExternalLink,
  Flame,
  GitBranch as Github,
  GitFork,
  LoaderCircle,
  Medal,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

type StatsTab = "github" | "leetcode";

type GithubApiProfile = {
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  website: string;
  publicRepositories: number;
  followers: number;
  following: number;
  joinedAt: string;
  updatedAt: string;
};

type GithubApiSummary = {
  repositoryCount: number;
  totalStars: number;
  totalForks: number;
  recentPublicEvents: number;
};

type GithubApiLanguage = {
  name: string;
  repositoryCount: number;
  percentage: number;
};

type GithubApiRepository = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
};

type GithubApiEvent = {
  id: string;
  type: string;
  repository: string;
  createdAt: string;
  action: string | null;
  branch: string | null;
  commits: number;
  commitMessage: string | null;
};

type GithubApiResponse = {
  success: boolean;

  profile?: GithubApiProfile;
  summary?: GithubApiSummary;
  languages?: GithubApiLanguage[];
  featuredRepositories?: GithubApiRepository[];
  recentEvents?: GithubApiEvent[];

  api?: {
    authenticated: boolean;
    remainingRequests: string | null;
    generatedAt: string;
  };

  error?: string;
};

type StatItem = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

const leetcodePreviewStats: StatItem[] = [
  {
    label: "Problems Solved",
    value: "Coming soon",
    description: "All difficulties",
    icon: CheckCircle2,
  },
  {
    label: "Easy Solved",
    value: "Coming soon",
    description: "Foundational problems",
    icon: Code2,
  },
  {
    label: "Medium Solved",
    value: "Coming soon",
    description: "Intermediate problems",
    icon: Flame,
  },
  {
    label: "Contest Rating",
    value: "Coming soon",
    description: "Competitive progress",
    icon: Trophy,
  },
];

export function CodingStats() {
  const [activeTab, setActiveTab] = useState<StatsTab>("github");
  const [githubData, setGithubData] =
    useState<GithubApiResponse | null>(null);
  const [isGithubLoading, setIsGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGithubData() {
      try {
        setIsGithubLoading(true);
        setGithubError(null);

        const response = await fetch("/api/github", {
          method: "GET",
          signal: controller.signal,
        });

        const data = (await response.json()) as GithubApiResponse;

        if (!response.ok || !data.success) {
          throw new Error(
            data.error || "Unable to retrieve GitHub information."
          );
        }

        setGithubData(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setGithubError(
          error instanceof Error
            ? error.message
            : "Unable to retrieve GitHub information."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsGithubLoading(false);
        }
      }
    }

    void loadGithubData();

    return () => {
      controller.abort();
    };
  }, []);

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const swipeDistance = 60;

    if (
      info.offset.x < -swipeDistance &&
      activeTab === "github"
    ) {
      setActiveTab("leetcode");
    }

    if (
      info.offset.x > swipeDistance &&
      activeTab === "leetcode"
    ) {
      setActiveTab("github");
    }
  }

  return (
    <section className="mt-12">
      <StatsTabSelector
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <p className="mt-4 text-center text-xs text-slate-500">
        Click a platform or drag the dashboard left and right.
      </p>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        className="mt-8 cursor-grab touch-pan-y active:cursor-grabbing"
      >
        <AnimatePresence mode="wait">
          {activeTab === "github" ? (
            <GithubDashboard
              key="github"
              data={githubData}
              isLoading={isGithubLoading}
              error={githubError}
            />
          ) : (
            <LeetCodeDashboard key="leetcode" />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

type StatsTabSelectorProps = {
  activeTab: StatsTab;
  onChange: (tab: StatsTab) => void;
};

function StatsTabSelector({
  activeTab,
  onChange,
}: StatsTabSelectorProps) {
  return (
    <div className="mx-auto flex w-full max-w-md rounded-2xl border border-white/10 bg-slate-950/70 p-1.5 backdrop-blur-xl">
      <button
        type="button"
        onClick={() => onChange("github")}
        className="relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
      >
        {activeTab === "github" && (
          <motion.span
            layoutId="active-stats-tab"
            className="absolute inset-0 rounded-xl border border-emerald-400/30 bg-emerald-400/10"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
          />
        )}

        <Github
          className={`relative z-10 size-5 ${
            activeTab === "github"
              ? "text-emerald-300"
              : "text-slate-500"
          }`}
        />

        <span
          className={`relative z-10 ${
            activeTab === "github"
              ? "text-emerald-200"
              : "text-slate-400"
          }`}
        >
          GitHub
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange("leetcode")}
        className="relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
      >
        {activeTab === "leetcode" && (
          <motion.span
            layoutId="active-stats-tab"
            className="absolute inset-0 rounded-xl border border-lime-400/30 bg-lime-400/10"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
          />
        )}

        <Code2
          className={`relative z-10 size-5 ${
            activeTab === "leetcode"
              ? "text-lime-300"
              : "text-slate-500"
          }`}
        />

        <span
          className={`relative z-10 ${
            activeTab === "leetcode"
              ? "text-lime-200"
              : "text-slate-400"
          }`}
        >
          LeetCode
        </span>
      </button>
    </div>
  );
}



type GithubDashboardProps = {
  data: GithubApiResponse | null;
  isLoading: boolean;
  error: string | null;
};

function GithubDashboard({
  data,
  isLoading,
  error,
}: GithubDashboardProps) {
  if (isLoading) {
    return <GithubLoadingState />;
  }

  if (error || !data) {
    return (
      <GithubErrorState
        message={
          error ||
          "GitHub information is currently unavailable."
        }
      />
    );
  }

  if (!data.profile || !data.summary) {
    return (
      <GithubErrorState message="The GitHub API returned incomplete profile information." />
    );
  }

  // Store the checked values in constants.
  // TypeScript now knows these cannot be undefined.
  const profile = data.profile;
  const summary = data.summary;

  const repositories =
    data.featuredRepositories ?? [];

  const languages =
    data.languages ?? [];

  const recentEvents =
    data.recentEvents ?? [];

  const authenticated =
    data.api?.authenticated ?? false;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -35,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 35,
      }}
      transition={{
        duration: 0.3,
      }}
      className="space-y-8"
    >
      <GithubProfileHeader
        profile={profile}
        authenticated={authenticated}
      />

      <GithubHeatmap />

      <GithubStatsGrid
        profile={profile}
        summary={summary}
      />

      <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
        <FeaturedRepositories
          repositories={repositories}
        />

        <LanguageBreakdown
          languages={languages}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <AchievementChecklist
          profile={profile}
          summary={summary}
        />

        <RecentGithubActivity
          events={recentEvents}
        />
      </div>
    </motion.div>
  );
}

function GithubLoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-emerald-400/15 bg-slate-950/60 p-8 backdrop-blur-xl"
    >
      <div className="flex min-h-72 flex-col items-center justify-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          <LoaderCircle className="size-8 animate-spin" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          Loading GitHub activity
        </h2>

        <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
          Retrieving your profile, repositories, followers and
          development statistics.
        </p>
      </div>
    </motion.div>
  );
}

type GithubErrorStateProps = {
  message: string;
};

function GithubErrorState({
  message,
}: GithubErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-red-400/20 bg-slate-950/60 p-8 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-300">
          <Github className="size-8" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          GitHub data could not load
        </h2>

        <p className="mt-3 text-sm leading-7 text-red-200">
          {message}
        </p>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Check your GitHub username, API route and environment
          variables, then refresh this page.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-400/20"
        >
          Try again
        </button>
      </div>
    </motion.div>
  );
}

type GithubProfileHeaderProps = {
  profile: GithubApiProfile;
  authenticated: boolean;
};

function GithubProfileHeader({
  profile,
  authenticated,
}: GithubProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-400/15 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative size-24 shrink-0">
            <img
              src={profile.avatarUrl}
              alt={`${profile.name}'s GitHub profile`}
              className="size-24 rounded-3xl border border-emerald-400/30 object-cover"
            />

            <span className="absolute -bottom-1 -right-1 size-5 rounded-full border-4 border-slate-950 bg-emerald-400" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                GitHub activity
              </p>

              <span className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-200">
                {authenticated
                  ? "Authenticated API"
                  : "Public API"}
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {profile.name}
            </h2>

            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
            >
              @{profile.username}
            </a>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              {profile.bio ||
                "Computer Science student building projects and strengthening software-development skills."}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
              {profile.location && (
                <span>📍 {profile.location}</span>
              )}

              {profile.company && (
                <span>🏢 {profile.company}</span>
              )}

              <span>
                Joined{" "}
                {new Date(profile.joinedAt).toLocaleDateString(
                  "en-GB",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
        >
          View GitHub profile
          <ExternalLink className="size-4" />
        </a>
      </div>

      <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
        <ProfileMiniStat
          label="Followers"
          value={profile.followers}
        />

        <ProfileMiniStat
          label="Following"
          value={profile.following}
        />

        <ProfileMiniStat
          label="Public repositories"
          value={profile.publicRepositories}
        />
      </div>
    </div>
  );
}

type ProfileMiniStatProps = {
  label: string;
  value: number;
};

function ProfileMiniStat({
  label,
  value,
}: ProfileMiniStatProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
      <p className="text-2xl font-bold text-white">
        {value.toLocaleString("en-GB")}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

function GithubHeatmap() {
  const contributionLevels = [
    0, 0, 1, 0, 2, 1, 0, 1, 2, 0, 1, 3, 2, 0,
    0, 1, 2, 3, 4, 1, 0, 1, 3, 4, 2, 1, 0, 2,
    2, 4, 3, 1, 0, 1, 3, 0, 2, 4, 3, 2, 1, 0,
    1, 2, 3, 4, 2, 0, 1, 3, 4, 2, 1, 0, 2, 4,
    2, 1, 0, 3, 4, 2, 1, 0, 2, 3, 4, 1, 0, 2,
    4, 3, 2, 0, 1, 3, 4, 1, 0, 2, 4, 3, 1, 0,
    2, 3, 4, 2, 1, 0, 3, 4, 2, 1, 0, 2, 3, 4,
    1, 2, 0, 3, 4, 2, 1, 0, 1, 3, 4, 2, 0, 1,
    2, 4, 3, 1, 0, 2, 3, 4, 2, 1, 0, 3, 4, 2,
    1, 0, 2, 3, 4, 1, 0, 2, 4, 3, 2, 1, 0, 3,
  ];

  return (
    <div className="rounded-3xl border border-emerald-400/15 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-300">
            Contribution calendar
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Contribution preview
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            The live GitHub contribution calendar will be connected
            in the next activity part.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Less</span>

          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className={`size-3 rounded-[3px] ${getGithubHeatmapColour(
                level
              )}`}
            />
          ))}

          <span>More</span>
        </div>
      </div>

      <div className="mt-7 overflow-x-auto pb-2">
        <div className="grid min-w-[720px] grid-flow-col grid-rows-7 gap-1.5">
          {contributionLevels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: Math.min(index * 0.002, 0.3),
              }}
              title={`Contribution level ${level}`}
              className={`size-3 rounded-[3px] sm:size-3.5 ${getGithubHeatmapColour(
                level
              )}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function getGithubHeatmapColour(level: number) {
  if (level === 0) return "bg-slate-800";
  if (level === 1) return "bg-emerald-950";
  if (level === 2) return "bg-emerald-800";
  if (level === 3) return "bg-emerald-600";
  return "bg-emerald-400";
}

type GithubStatsGridProps = {
  profile: GithubApiProfile;
  summary: GithubApiSummary;
};

function GithubStatsGrid({
  profile,
  summary,
}: GithubStatsGridProps) {
  const realGithubStats: StatItem[] = [
    {
      label: "Repositories",
      value: summary.repositoryCount.toLocaleString("en-GB"),
      description: "Active original repositories",
      icon: BookOpen,
    },
    {
      label: "Total Stars",
      value: summary.totalStars.toLocaleString("en-GB"),
      description: "Across public repositories",
      icon: Star,
    },
    {
      label: "Total Forks",
      value: summary.totalForks.toLocaleString("en-GB"),
      description: "Repository forks",
      icon: GitFork,
    },
    {
      label: "Followers",
      value: profile.followers.toLocaleString("en-GB"),
      description: "GitHub community",
      icon: Users,
    },
    {
      label: "Following",
      value: profile.following.toLocaleString("en-GB"),
      description: "Developers followed",
      icon: Github,
    },
    {
      label: "Recent Events",
      value: summary.recentPublicEvents.toLocaleString("en-GB"),
      description: "Recent public activity returned",
      icon: Activity,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {realGithubStats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <Icon className="size-5" />
              </div>

              <span className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300">
                Live
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-white">
              {stat.value}
            </p>

            <p className="mt-2 font-semibold text-slate-200">
              {stat.label}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {stat.description}
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}

type FeaturedRepositoriesProps = {
  repositories: GithubApiRepository[];
};

function FeaturedRepositories({
  repositories,
}: FeaturedRepositoriesProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-300">
            Project showcase
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Featured repositories
          </h3>
        </div>

        <span className="text-sm text-slate-500">
          {repositories.length} repositories
        </span>
      </div>

      {repositories.length === 0 ? (
        <p className="mt-7 rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-sm text-slate-400">
          No public repositories were returned by GitHub.
        </p>
      ) : (
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {repositories.map((repository, index) => (
            <motion.a
              key={repository.id}
              href={repository.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-emerald-400/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <Github className="size-5" />
                </div>

                <ExternalLink className="size-4 text-slate-600 transition group-hover:text-emerald-300" />
              </div>

              <h4 className="mt-5 text-lg font-bold text-white">
                {repository.name}
              </h4>

              <p className="mt-2 min-h-16 text-sm leading-6 text-slate-400">
                {repository.description ||
                  "No repository description has been added yet."}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <CircleDot className="size-3.5 text-emerald-300" />
                  {repository.language}
                </span>

                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5" />
                  {repository.stars}
                </span>

                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3.5" />
                  {repository.forks}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}

type LanguageBreakdownProps = {
  languages: GithubApiLanguage[];
};

function LanguageBreakdown({
  languages,
}: LanguageBreakdownProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
      <p className="text-sm font-medium text-emerald-300">
        Technology usage
      </p>

      <h3 className="mt-1 text-2xl font-bold text-white">
        Most-used languages
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Calculated from your active public repositories.
      </p>

      {languages.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-sm text-slate-400">
          GitHub did not return language information.
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {languages.map((language, index) => (
            <div key={language.name}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-200">
                  {language.name}
                </span>

                <span className="text-sm font-semibold text-emerald-300">
                  {language.percentage}%
                </span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${language.percentage}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-300"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

type AchievementChecklistProps = {
  profile: GithubApiProfile;
  summary: GithubApiSummary;
};

function AchievementChecklist({
  profile,
  summary,
}: AchievementChecklistProps) {
  const achievements = [
    {
      label: "Published a public GitHub repository",
      complete: summary.repositoryCount >= 1,
    },
    {
      label: "Created 5+ repositories",
      complete: summary.repositoryCount >= 5,
    },
    {
      label: "Created 10+ repositories",
      complete: summary.repositoryCount >= 10,
    },
    {
      label: "Earned 10 repository stars",
      complete: summary.totalStars >= 10,
    },
    {
      label: "Reached 10 GitHub followers",
      complete: profile.followers >= 10,
    },
  ];

  const completedCount = achievements.filter(
    (achievement) => achievement.complete
  ).length;

  const completionPercentage = Math.round(
    (completedCount / achievements.length) * 100
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-300">
            Growth milestones
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Achievement checklist
          </h3>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          <Medal className="size-6" />
        </div>
      </div>

      <div className="mt-7 space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.label}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/40 p-4"
          >
            {achievement.complete ? (
              <CheckCircle2 className="size-5 shrink-0 text-emerald-300" />
            ) : (
              <CircleDot className="size-5 shrink-0 text-slate-600" />
            )}

            <span
              className={
                achievement.complete
                  ? "text-sm font-medium text-slate-200"
                  : "text-sm text-slate-500"
              }
            >
              {achievement.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Overall completion
          </span>

          <span className="font-semibold text-emerald-300">
            {completionPercentage}%
          </span>
        </div>

        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{
              width: `${completionPercentage}%`,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="h-full rounded-full bg-emerald-400"
          />
        </div>
      </div>
    </section>
  );
}

type RecentGithubActivityProps = {
  events: GithubApiEvent[];
};

function RecentGithubActivity({
  events,
}: RecentGithubActivityProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-300">
            Development timeline
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Recent activity
          </h3>
        </div>

        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
          <Activity className="size-6" />
        </div>
      </div>

      {events.length === 0 ? (
        <p className="mt-7 rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-sm text-slate-400">
          No recent public GitHub events were returned.
        </p>
      ) : (
        <div className="mt-7 space-y-6">
          {events.slice(0, 6).map((event, index) => (
            <div
              key={event.id}
              className="relative flex gap-4"
            >
              {index < Math.min(events.length, 6) - 1 && (
                <div className="absolute left-[21px] top-11 h-[calc(100%+24px)] w-px bg-white/10" />
              )}

              <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-slate-900 text-emerald-300">
                <Activity className="size-5" />
              </div>

              <div className="pb-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h4 className="font-semibold text-white">
                    {formatGithubEventType(event.type)}
                  </h4>

                  <span className="text-xs text-emerald-300">
                    {formatRelativeDate(event.createdAt)}
                  </span>
                </div>

                <p className="mt-2 break-all text-sm leading-6 text-slate-400">
                  {event.repository}
                </p>

                {event.commitMessage && (
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {event.commitMessage}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function formatGithubEventType(type: string) {
  const labels: Record<string, string> = {
    PushEvent: "Pushed commits",
    CreateEvent: "Created repository or branch",
    PullRequestEvent: "Pull request activity",
    IssuesEvent: "Issue activity",
    WatchEvent: "Starred a repository",
    ForkEvent: "Forked a repository",
    DeleteEvent: "Deleted a branch or tag",
    IssueCommentEvent: "Commented on an issue",
  };

  return labels[type] ?? type.replace(/Event$/, "");
}

function formatRelativeDate(dateString: string) {
  const eventDate = new Date(dateString);
  const differenceInMilliseconds = Date.now() - eventDate.getTime();
  const differenceInHours = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60)
  );

  if (differenceInHours < 1) return "Recently";
  if (differenceInHours < 24) return `${differenceInHours}h ago`;

  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays < 30) return `${differenceInDays}d ago`;

  return eventDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function LeetCodeDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -35 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="rounded-3xl border border-lime-400/15 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-lime-400/10 text-lime-300">
              <Code2 className="size-7" />
            </div>

            <div>
              <p className="text-sm font-medium text-lime-300">
                LeetCode activity
              </p>

              <h2 className="text-2xl font-bold text-white">
                Problem-solving progress
              </h2>
            </div>
          </div>

          <span className="w-fit rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-xs font-semibold text-lime-200">
            Complete dashboard in Part 11D
          </span>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400">
          The next design part will add solved questions,
          difficulty progress, contest statistics, topic
          performance, streaks and a LeetCode submission calendar.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {leetcodePreviewStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-lime-400/15 bg-lime-400/5 text-lime-300">
                <Icon className="size-5" />
              </div>

              <p className="mt-5 text-2xl font-bold text-white">
                {stat.value}
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-200">
                {stat.label}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}