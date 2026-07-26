"use client";


import type { MouseEvent, ReactNode } from "react";
import Image from "next/image";
import {
  BookOpen,
  Code2,
  Coffee,
  Gamepad2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { PageContainer } from "@/components/layout/page-container";

const timelineItems = [
  {
    year: "2023",
    title: "Started My Computer Science Journey",
    description:
      "I began developing a strong interest in programming, problem-solving and understanding how software products are created.",
    icon: GraduationCap,
  },
  {
    year: "2024",
    title: "Focused on Java and DSA",
    description:
      "I started learning Java, object-oriented programming, data structures and algorithms through regular coding practice.",
    icon: Code2,
  },
  {
    year: "2025",
    title: "Entered Full-Stack Development",
    description:
      "I began building web applications using HTML, CSS, JavaScript, React, Node.js, Express and databases.",
    icon: Rocket,
  },
  {
    year: "2026",
    title: "Building Real Projects",
    description:
      "I am currently creating portfolio-ready projects, improving my problem-solving skills and exploring AI-powered applications.",
    icon: Sparkles,
  },
];

const values = [
  {
    title: "Continuous Learning",
    description:
      "Technology changes quickly, so I believe in learning consistently and improving one step at a time.",
    icon: BookOpen,
  },
  {
    title: "Problem First",
    description:
      "Before writing code, I try to understand the real problem, the user and the reason the solution is needed.",
    icon: Target,
  },
  {
    title: "Useful Creativity",
    description:
      "A project should look attractive, but it should also remain simple, accessible and useful.",
    icon: Lightbulb,
  },
  {
    title: "Teamwork and Respect",
    description:
      "Good software is often built through communication, feedback, cooperation and respect for other people.",
    icon: HeartHandshake,
  },
];

const funFacts = [
  {
    title: "Coding Sessions",
    value: "Late-night",
    description:
      "I often enjoy focused coding sessions when everything is quiet.",
    icon: Code2,
  },
  {
    title: "Favourite Fuel",
    value: "Coffee",
    description:
      "Coffee and a clear task list help me enter productive mode.",
    icon: Coffee,
  },
  {
    title: "Beyond Code",
    value: "Gaming",
    description:
      "I enjoy games, technology videos and exploring how digital experiences are designed.",
    icon: Gamepad2,
  },
  {
    title: "Current Mission",
    value: "15+ LPA",
    description:
      "My goal is to become a strong software engineer and build a successful technology career.",
    icon: Rocket,
  },
];

export function AboutSection() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <JourneyTimeline />
      <CoreValues />
      <FunFacts />
    </div>
  );
}

function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32">
      <AboutBackground />

      <PageContainer>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <TiltProfileCard />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl"
            >
              <Sparkles className="size-4 text-cyan-300" />
              More than just code
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              My journey into{" "}
              <span className="text-signature-gradient">
                software development
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg"
            >
              <p>
                I&apos;m Priyanshu Jaggi, a Computer Science student
                who enjoys understanding how technology works and
                using it to solve meaningful problems.
              </p>

              <p>
                My development journey started with Java and
                object-oriented programming. As I became more
                comfortable with coding, I moved towards data
                structures, algorithms and full-stack web
                development.
              </p>

              <p>
                I am currently strengthening my DSA knowledge,
                developing modern web applications and exploring
                artificial intelligence. My long-term goal is to
                become a skilled software engineer who can build
                reliable, user-friendly and impactful products.
              </p>
              <p>
  I&apos;m Priyanshu Jaggi, a Full Stack Developer with a strong foundation in Data Structures &amp; Algorithms and Java, backed by hands-on skills across the modern web stack. I don&apos;t just write code that works — I write code that&apos;s efficient, clean, and built to scale.
</p>
<p>
  I move fast, ship real projects, and hold myself to a high bar — whether it&apos;s solving a tough DSA problem or shipping a full product end to end. Constantly learning, constantly building, always leveling up.
</p>
<p>
  Looking for a developer who combines strong fundamentals with real-world execution? Let&apos;s build something.
</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <InfoBadge icon={<MapPin className="size-4" />}>
                India
              </InfoBadge>

              <InfoBadge icon={<GraduationCap className="size-4" />}>
                Computer Science Student
              </InfoBadge>

              <InfoBadge icon={<Code2 className="size-4" />}>
                Open to Opportunities
              </InfoBadge>
            </motion.div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function TiltProfileCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 160,
    damping: 20,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 160,
    damping: 20,
  });

  const rotateY = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-8, 8]
  );

  const rotateX = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [8, -8]
  );

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rectangle =
      event.currentTarget.getBoundingClientRect();

    const positionX =
      (event.clientX - rectangle.left) / rectangle.width - 0.5;

    const positionY =
      (event.clientY - rectangle.top) / rectangle.height - 0.5;

    mouseX.set(positionX);
    mouseY.set(positionY);
  }

  function resetCardPosition() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCardPosition}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="relative mx-auto max-w-md cursor-pointer"
    >
      <motion.div
  animate={{
    opacity: [0.25, 0.5, 0.25],
    scale: [1, 1.04, 1],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute -inset-6 rounded-[2.5rem] bg-signature-gradient blur-3xl"
/>
      <div className="surface-card relative overflow-hidden rounded-[2.5rem] p-3">
  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-cyan-400/20">
    <Image
      src="/profile.png"
      alt="Priyanshu Jaggi"
      fill
      priority
      sizes="(max-width: 1024px) 90vw, 420px"
      className="object-cover object-top transition-transform duration-700 hover:scale-105"
    />

    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

    <div className="absolute inset-x-0 bottom-0 p-6">
      <p className="font-display text-2xl font-bold text-white">
        Priyanshu Jaggi
      </p>

      <p className="mt-1 text-sm text-white/70">
        Full Stack Developer
      </p>
    </div>
  </div>
</div>

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="surface-card absolute -right-4 top-10 rounded-2xl px-4 py-3 sm:-right-8"
      >
        <p className="text-xs text-muted-foreground">
          Current focus
        </p>

        <p className="mt-1 text-sm font-semibold text-cyan-300">
          DSA + Full Stack
        </p>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="surface-card absolute -bottom-4 -left-3 rounded-2xl px-4 py-3 sm:-left-8"
      >
        <p className="text-xs text-muted-foreground">
          Building with
        </p>

        <p className="mt-1 text-sm font-semibold text-violet-300">
          Java · React · Next.js
        </p>
      </motion.div>
    </motion.div>
  );
}

function InfoBadge({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl">
      <span className="text-cyan-300">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function JourneyTimeline() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-20 sm:py-24 lg:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="My path"
          title="The journey so far"
          description="Every stage has helped me become more confident in problem-solving, development and building complete projects."
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-400 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    x: isEven ? -45 : 45,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                  }}
                  className="relative grid gap-8 pl-16 sm:grid-cols-2 sm:pl-0"
                >
                  <div
                    className={
                      isEven
                        ? "sm:pr-12 sm:text-right"
                        : "sm:col-start-2 sm:pl-12"
                    }
                  >
                    <TimelineCard
                      year={item.year}
                      title={item.title}
                      description={item.description}
                    />
                  </div>

                  <div className="absolute left-0 top-7 flex size-10 items-center justify-center rounded-full border border-white/15 bg-background shadow-glow sm:left-1/2 sm:-translate-x-1/2">
                    <Icon className="size-4 text-cyan-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

function TimelineCard({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {
  return (
    <div className="surface-card rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
      <span className="text-sm font-bold text-cyan-300">
        {year}
      </span>

      <h3 className="mt-2 font-display text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function CoreValues() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="How I work"
          title="Principles that guide me"
          description="These values influence how I learn, solve problems, collaborate and approach software development."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.article
                key={value.title}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                className="surface-card group rounded-3xl p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-signature-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold">
                  {value.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}

function FunFacts() {
  return (
    <section className="border-t border-white/10 bg-white/[0.02] py-20 sm:py-24 lg:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="Beyond development"
          title="A few things about me"
          description="Some small details about my interests, work habits and goals outside normal project descriptions."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {funFacts.map((fact, index) => {
            const Icon = fact.icon;

            return (
              <motion.article
                key={fact.title}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -7,
                }}
                className="surface-card group rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  {fact.title}
                </p>

                <h3 className="mt-1 font-display text-2xl font-bold text-signature-gradient">
                  {fact.value}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {fact.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.6,
      }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

function AboutBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-10 size-[30rem] rounded-full bg-violet-600/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 60, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-1/3 size-[28rem] rounded-full bg-cyan-500/10 blur-3xl"
      />
    </div>
  );
}