import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FlowingSkillsBackground } from "@/components/effects/flowing-skills-background";
import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <section className="section-spacing relative isolate overflow-hidden">
        <PageContainer>
          <div className="surface-card relative isolate min-h-[520px] overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-12">
            <FlowingSkillsBackground />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 z-[1] size-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] bg-slate-950/25"
            />

            <div className="relative z-10 flex min-h-[360px] flex-col items-center justify-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Portfolio Foundation
              </p>

              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
                Priyanshu&apos;s{" "}
                <span className="text-signature-gradient">
                  Developer Portfolio
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Dream Big. Build Bigger.
                <br />
                Every line of code brings me one step closer to
                becoming a world-class Software Engineer.
              </p>

              <Link
                href="/about"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 bg-signature-gradient text-white shadow-glow transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
                )}
              >
                Explore the structure
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}