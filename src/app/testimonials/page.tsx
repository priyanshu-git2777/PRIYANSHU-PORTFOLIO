import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read testimonials and recommendations for Priyanshu Jaggi.",
};

export default function TestimonialsPage() {
  return (
    <section className="section-spacing">
      <PageContainer>
        <div className="surface-card rounded-3xl px-6 py-20 text-center sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Recommendations
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            Testimonials
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            The animated testimonial carousel will be created
            in Part 6.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}