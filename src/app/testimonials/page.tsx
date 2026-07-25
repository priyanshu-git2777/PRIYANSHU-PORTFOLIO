import type { Metadata } from "next";

import { TestimonialsSection } from "@/components/sections/testimonials-section";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read recommendations and feedback about Priyanshu Jaggi's learning, teamwork and software-development journey.",
};

export default function TestimonialsPage() {
  return <TestimonialsSection />;
}