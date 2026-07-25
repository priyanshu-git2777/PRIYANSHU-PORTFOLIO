import type { Metadata } from "next";

import { SkillsSection } from "@/components/sections/skills-section";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore the programming languages, frontend technologies, backend tools, databases and development tools used by Priyanshu Jaggi.",
};

export default function SkillsPage() {
  return <SkillsSection />;
}