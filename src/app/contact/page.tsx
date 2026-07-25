import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Priyanshu Jaggi for opportunities and collaborations.",
};

export default function ContactPage() {
  return (
    <section className="section-spacing">
      <PageContainer>
        <div className="surface-card rounded-3xl px-6 py-20 text-center sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Start a conversation
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            Contact Me
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            The validated contact form and animated social links
            will be created in Part 6.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}