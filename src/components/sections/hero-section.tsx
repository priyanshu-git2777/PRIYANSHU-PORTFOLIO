"use client";
import { FlowingSkillsBackground } from "@/components/effects/flowing-skills-background";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";
import {
  FaGithub,
  FaJava,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";
import { AnimatePresence, motion } from "motion/react";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const roles = [
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Java Developer",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/your-github-priyanshu-git2777",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    label: "Email",
    href: "mailto:your-priyanshujaggi188@gmail.com",
    icon: Mail,
  },
];

export function HeroSection() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveRoleIndex((currentIndex) => {
        return (currentIndex + 1) % roles.length;
      });
    }, 2500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      <AnimatedBackground />

      <PageContainer className="relative z-10">
        <div className="grid items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl"
            >
              <Sparkles className="size-4 text-cyan-300" />

              <span>Welcome to my digital workspace</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3 text-base font-medium text-muted-foreground sm:text-lg"
            >
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="text-signature-gradient">
                Priyanshu Jaggi
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 flex min-h-12 items-center justify-center text-xl font-semibold sm:text-2xl lg:justify-start lg:text-3xl"
            >
              <span className="mr-3 text-foreground">
                I&apos;m a
              </span>

              <div className="relative overflow-hidden">
                <FlowingSkillsBackground />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[activeRoleIndex]}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.35 }}
                    className="block text-cyan-300"
                  >
                    {roles[activeRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0"
            >
              I build modern, responsive and meaningful digital
              experiences using full-stack technologies. I enjoy
              solving real problems, learning new tools and turning
              ideas into useful products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group w-full bg-signature-gradient text-white shadow-glow transition-all duration-300 hover:-translate-y-1 hover:opacity-90 sm:w-auto"
                )}
              >
                View Projects

                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "w-full border-white/15 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:w-auto"
                )}
              >
                Contact Me
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-3 lg:justify-start"
            >
              <span className="mr-1 text-sm text-muted-foreground">
                Find me on
              </span>

              {socialLinks.map((socialLink) => {
                const Icon = socialLink.icon;
                const isExternal =
                  socialLink.href.startsWith("http");

                return (
                  <a
                    key={socialLink.label}
                    href={socialLink.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    aria-label={socialLink.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:text-cyan-300"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          <motion.div
  initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.35,
    ease: "easeOut",
  }}
  className="relative mx-auto hidden w-full max-w-md lg:block"
>
  <InteractiveProfile />
</motion.div>
        </div>
      </PageContainer>

      <motion.a
        href="#hero-next-section"
        aria-label="Scroll to the next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: {
            delay: 1,
            duration: 0.5,
          },
          y: {
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-cyan-300"
      >
        <span>Scroll down</span>

        <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
          <ArrowDown className="size-4" />
        </span>
      </motion.a>
    </section>
  );
}

function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        animate={{
          x: [0, 80, -20, 0],
          y: [0, 40, 90, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-28 top-12 size-[28rem] rounded-full bg-violet-600/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -70, 20, 0],
          y: [0, 80, 20, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-28 top-1/4 size-[30rem] rounded-full bg-cyan-500/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -70, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/3 size-[25rem] rounded-full bg-blue-600/15 blur-3xl"
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

function InteractiveProfile() {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        rotateY: 3,
        rotateX: -2,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
      }}
      className="relative mx-auto h-[470px] w-full max-w-[390px]"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Large animated glow */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 opacity-40 blur-3xl"
      />

      {/* Rotating border */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -inset-2 rounded-[2.7rem] bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 p-[2px]"
      >
        <div className="h-full w-full rounded-[2.6rem] bg-background" />
      </motion.div>

      {/* Main image card */}
      <div className="surface-card relative h-full overflow-hidden rounded-[2.5rem] border border-white/10">
        <Image
          src="/profile.png"
          alt="Priyanshu Jaggi"
          fill
          priority
          sizes="390px"
          className="object-cover object-top transition-transform duration-700 hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9,
            duration: 0.6,
          }}
          className="absolute inset-x-0 bottom-0 p-7"
        >
          <p className="font-display text-2xl font-bold text-white">
            Priyanshu Jaggi
          </p>

          <p className="mt-1 text-sm text-white/70">
            Full Stack Developer
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-black/40 px-3 py-2 backdrop-blur-xl">
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="size-2 rounded-full bg-emerald-400"
            />

            <span className="text-xs text-emerald-300">
              Available for opportunities
            </span>
          </div>
        </motion.div>
      </div>

      {/* React icon */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.2,
          rotate: 20,
        }}
        className="absolute -left-10 top-12 z-20 flex size-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-slate-950/70 text-cyan-300 shadow-xl backdrop-blur-xl"
      >
        <SiReact className="size-8" />
      </motion.div>

      {/* Next.js icon */}
      <motion.div
        animate={{
          y: [0, 13, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.2,
          rotate: -20,
        }}
        className="absolute -right-9 top-24 z-20 flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/70 text-white shadow-xl backdrop-blur-xl"
      >
        <SiNextdotjs className="size-8" />
      </motion.div>

      {/* Java icon */}
      <motion.div
        animate={{
          x: [0, 12, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.2,
          rotate: 10,
        }}
        className="absolute -left-8 bottom-24 z-20 flex size-16 items-center justify-center rounded-2xl border border-orange-400/20 bg-slate-950/70 text-orange-300 shadow-xl backdrop-blur-xl"
      >
        <FaJava className="size-8" />
      </motion.div>

      {/* MongoDB icon */}
      <motion.div
        animate={{
          x: [0, -12, 0],
          y: [0, 7, 0],
        }}
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.2,
          rotate: -10,
        }}
        className="absolute -right-8 bottom-16 z-20 flex size-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-slate-950/70 text-emerald-300 shadow-xl backdrop-blur-xl"
      >
        <SiMongodb className="size-8" />
      </motion.div>

      {/* Node.js small icon */}
      <motion.div
        animate={{
          y: [0, -9, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.2,
        }}
        className="absolute left-1/2 top-[-28px] z-20 flex size-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-green-400/20 bg-slate-950/70 text-green-300 shadow-xl backdrop-blur-xl"
      >
        <SiNodedotjs className="size-7" />
      </motion.div>
    </motion.div>
  );
}

function DeveloperCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-signature-gradient opacity-20 blur-2xl" />

      <div className="surface-card relative overflow-hidden rounded-[2rem] p-6">
        <div className="mb-6 flex items-center gap-2">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-emerald-400" />

          <span className="ml-3 text-xs text-muted-foreground">
            developer.ts
          </span>
        </div>

        <div className="space-y-4 font-mono text-sm leading-7">
          <CodeLine
            number="01"
            content={
              <>
                <span className="text-violet-300">const</span>{" "}
                <span className="text-cyan-300">developer</span>{" "}
                <span className="text-muted-foreground">=</span>{" "}
                <span className="text-foreground">{"{"}</span>
              </>
            }
          />

          <CodeLine
            number="02"
            content={
              <>
                <span className="pl-5 text-blue-300">name</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-emerald-300">
                  &quot;Priyanshu Jaggi&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </>
            }
          />

          <CodeLine
            number="03"
            content={
              <>
                <span className="pl-5 text-blue-300">role</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-emerald-300">
                  &quot;Full Stack Developer&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </>
            }
          />

          <CodeLine
            number="04"
            content={
              <>
                <span className="pl-5 text-blue-300">skills</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-foreground">[</span>
              </>
            }
          />

          <CodeLine
            number="05"
            content={
              <>
                <span className="pl-10 text-emerald-300">
                  &quot;Java&quot;
                </span>
                <span className="text-muted-foreground">,</span>{" "}
                <span className="text-emerald-300">
                  &quot;Next.js&quot;
                </span>
                <span className="text-muted-foreground">,</span>
              </>
            }
          />

          <CodeLine
            number="06"
            content={
              <>
                <span className="pl-10 text-emerald-300">
                  &quot;React&quot;
                </span>
                <span className="text-muted-foreground">,</span>{" "}
                <span className="text-emerald-300">
                  &quot;Node.js&quot;
                </span>
              </>
            }
          />

          <CodeLine
            number="07"
            content={
              <>
                <span className="pl-5 text-foreground">]</span>
                <span className="text-muted-foreground">,</span>
              </>
            }
          />

          <CodeLine
            number="08"
            content={
              <>
                <span className="pl-5 text-blue-300">available</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-violet-300">true</span>
              </>
            }
          />

          <CodeLine
            number="09"
            content={
              <span className="text-foreground">{"}"}</span>
            }
          />
        </div>

        <motion.div
          animate={{
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-7 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3"
        >
          <span className="size-2 rounded-full bg-emerald-400" />

          <span className="text-xs text-emerald-300">
            Available for opportunities
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function CodeLine({
  number,
  content,
}: {
  number: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <span className="select-none text-white/20">
        {number}
      </span>

      <span>{content}</span>
    </div>
  );
}