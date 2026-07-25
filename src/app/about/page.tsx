import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Priyanshu Jaggi, his development journey, technical interests, values and career goals.",
};

export default function AboutPage() {
  return <AboutSection />;
}