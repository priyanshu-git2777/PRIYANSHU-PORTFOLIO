"use client";

import type { ComponentType } from "react";

import {
  Bot,
  BrainCircuit,
  Cpu,
  Sparkles,
} from "lucide-react";

import {
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiKeras,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

import styles from "./flowing-skills-background.module.css";

type SkillItem = {
  name: string;
  Icon: ComponentType<{
    className?: string;
  }>;
};

const developmentSkills: SkillItem[] = [
  {
    name: "HTML5",
    Icon: SiHtml5,
  },
  {
    name: "CSS3",
    Icon: SiCss,
  },
  {
    name: "JavaScript",
    Icon: SiJavascript,
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
  },
  {
    name: "React",
    Icon: SiReact,
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
  },
  {
    name: "Express.js",
    Icon: SiExpress,
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
  },
  {
    name: "Git",
    Icon: SiGit,
  },
  {
    name: "GitHub",
    Icon: SiGithub,
  },
];

const aiSkills: SkillItem[] = [
  {
    name: "Artificial Intelligence",
    Icon: BrainCircuit,
  },
  {
    name: "Machine Learning",
    Icon: Cpu,
  },
  {
    name: "Gemini AI",
    Icon: Sparkles,
  },
  {
    name: "AI Assistants",
    Icon: Bot,
  },
  {
    name: "Python",
    Icon: SiPython,
  },
  {
    name: "TensorFlow",
    Icon: SiTensorflow,
  },
  {
    name: "PyTorch",
    Icon: SiPytorch,
  },
  {
    name: "Scikit-learn",
    Icon: SiScikitlearn,
  },
  {
    name: "Keras",
    Icon: SiKeras,
  },
  {
    name: "Pandas",
    Icon: SiPandas,
  },
  {
    name: "NumPy",
    Icon: SiNumpy,
  },
  {
    name: "Jupyter",
    Icon: SiJupyter,
  },
];

function SkillRow({
  skills,
  direction = "right",
  speed = "normal",
}: {
  skills: SkillItem[];
  direction?: "left" | "right";
  speed?: "normal" | "slow";
}) {
  const repeatedSkills = [...skills, ...skills,];

  const trackClass =
    direction === "right"
      ? speed === "slow"
        ? styles.trackRightSlow
        : styles.trackRight
      : speed === "slow"
        ? styles.trackLeftSlow
        : styles.trackLeft;

  return (
    <div className={styles.row}>
      <div className={trackClass}>
        {repeatedSkills.map(({ name, Icon }, index) => (
          <div
            key={`${name}-${index}`}
            className={styles.skill}
          >
            <Icon className={styles.icon} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FlowingSkillsBackground() {
  return (
    <div
      aria-hidden="true"
      className={styles.background}
    >
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <div className={styles.glowThree} />

      <div className={styles.flowContainer}>
        <SkillRow
          skills={developmentSkills}
          direction="right"
        />

        <SkillRow
          skills={aiSkills}
          direction="left"
          speed="slow"
        />

        <SkillRow
          skills={[
            ...aiSkills.slice(4),
            ...developmentSkills.slice(0, 7),
          ]}
          direction="left"
        />
      </div>

      <div className={styles.overlay} />
    </div>
  );
}