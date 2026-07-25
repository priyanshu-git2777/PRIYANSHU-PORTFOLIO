import type { Metadata } from "next";

import { ProjectsSection } from "@/components/sections/projects-section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore software-development projects created by Priyanshu Jaggi, including full-stack applications, Java DSA work and AI-powered tools.",
  alternates: {
    canonical: "/projects",
  },
};
export default function ProjectsPage() {
  return <ProjectsSection />;
}