import Image from "next/image";
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
          <div className="surface-card relative isolate min-h-[520px] overflow-hidden rounded-3xl px-6 py-14 sm:px-12">
            <FlowingSkillsBackground />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 z-[1] size-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] bg-slate-950/35"
            />

            <div className="relative z-10 flex min-h-[390px] flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
              <div className="group relative shrink-0">
  <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-violet-500/40 via-blue-500/30 to-cyan-400/40 opacity-70 blur-2xl transition duration-500 group-hover:scale-110 group-hover:opacity-100" />

  <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-1 group-hover:border-cyan-300/50">
    <div className="relative h-56 w-48 overflow-hidden rounded-[1.5rem] sm:h-64 sm:w-56">
      <Image
        src="/profile-photo.jpg"
        alt="Priyanshu Jaggi"
        fill
        priority
        sizes="(max-width: 640px) 192px, 224px"
        className="object-cover object-top transition duration-700 group-hover:scale-110"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-white/5" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="rounded-xl border border-white/10 bg-slate-950/65 px-4 py-3 backdrop-blur-md">
          <p className="text-sm font-semibold text-white">
            Priyanshu Jaggi
          </p>

          <p className="mt-1 text-xs text-cyan-300">
            Software Engineer
          </p>
        </div>
      </div>
    </div>
  </div>

  <span className="absolute -right-2 top-8 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-cyan-300 shadow-lg backdrop-blur-md transition duration-300 group-hover:-translate-y-1">
    Open to work
  </span>

  <span className="absolute -bottom-2 -left-2 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-slate-200 shadow-lg backdrop-blur-md">
    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
    Available
  </span>
</div>
              <div className="max-w-3xl text-center lg:text-left">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Let Build 
                </p>

                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
                  Priyanshu&apos;s{" "}
                  <span className="text-signature-gradient">
                    Developer Portfolio
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Dream Big. Build Bigger.
                  <br />
                  Every line of code brings me one step closer to becoming a
                  world-class Software Engineer.
                </p>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                  <Link
                    href="/projects"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-signature-gradient text-white shadow-glow transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
                    )}
                  >
                    Explore projects
                    <ArrowRight className="size-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: "outline",
                      }),
                      "border-white/15 bg-white/5"
                    )}
                  >
                    Contact me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}