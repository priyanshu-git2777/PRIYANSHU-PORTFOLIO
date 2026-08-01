import type { Metadata } from "next";

import {
  Activity,
  Code2,
  GitBranch as Github,
  Sparkles,
} from "lucide-react";

import { CodingStats } from "@/components/stats/coding-stats";

export const metadata: Metadata = {
  title: "Coding Activity",
  description:
    "Explore Priyanshu Jaggi's GitHub and LeetCode coding activity.",
};

const activityFeatures = [
  {
    title: "GitHub Activity",
    description:
      "View contributions, repositories, stars, languages and development progress.",
    icon: Github,
  },
  {
    title: "LeetCode Progress",
    description:
      "View solved problems, difficulty progress, streaks and submissions.",
    icon: Code2,
  },
  {
    title: "Consistent Growth",
    description:
      "A visual overview of my programming consistency and learning journey.",
    icon: Activity,
  },
];

export default function StatsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-24 pt-32 sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-20 size-[650px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 top-1/3 -z-20 size-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 -z-20 size-[500px] rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
            <Sparkles className="size-4" />

            Coding activity
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            My development activity in

            <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-lime-300 bg-clip-text text-transparent">
              one interactive dashboard
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Explore my GitHub development activity and
            LeetCode problem-solving progress. Click a
            platform or drag the dashboard to switch
            between both sections.
          </p>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {activityFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur-xl"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <Icon className="size-5" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-white">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </section>

        <CodingStats />
      </div>
    </main>
  );
}