import type { Metadata } from "next";
import SkillGlobe from "@/components/sections/skill-globe";

import { SkillsSection } from "@/components/sections/skills-section";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore Priyanshu Jaggi's technical skills in Java, JavaScript, TypeScript, React, Next.js, Node.js, MongoDB and full-stack development.",
  alternates: {
    canonical: "/skills",
  },
};

export default function SkillsPage() {
  return <SkillsSection />;
  <SkillGlobe />
}