import type { Metadata } from "next";

import { TestimonialsSection } from "@/components/sections/testimonials-section";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read recommendations and feedback about Priyanshu Jaggi's teamwork, learning journey and software-development work.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default function TestimonialsPage() {
  return <TestimonialsSection />;
}