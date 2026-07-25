import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <section className="section-spacing">
      <PageContainer>
        <div className="surface-card relative overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 -z-10 size-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl"
          />

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Portfolio foundation
          </p>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Priyanshu&apos;s{" "}
            <span className="text-signature-gradient">
              Developer Portfolio
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            The design system and project structure are ready.
            The animated hero section will be created in Part 2.
          </p>

          <Link
  href="/about"
  className={cn(
    buttonVariants({ size: "lg" }),
    "mt-8 bg-signature-gradient text-white shadow-glow hover:opacity-90"
  )}
>
  Explore the structure
  <ArrowRight className="size-4" />
</Link>
        </div>
      </PageContainer>
    </section>
  );
}