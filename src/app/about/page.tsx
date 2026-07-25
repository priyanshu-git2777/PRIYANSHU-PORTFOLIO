import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Priyanshu Jaggi, his Computer Science journey, software-development goals and current technical focus.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutSection />;
}