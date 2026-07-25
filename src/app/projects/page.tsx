import type { Metadata } from "next";

import { ProjectsSection } from "@/components/sections/projects-section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore frontend, full-stack and AI projects created by Priyanshu Jaggi, along with live public GitHub statistics.",
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}