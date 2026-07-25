"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  MessageSquareQuote,
  Pause,
  Play,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { PageContainer } from "@/components/layout/page-container";
import {
  testimonials,
  type Testimonial,
} from "@/data/testimonials";
import { cn } from "@/lib/utils";

const AUTO_PLAY_DELAY = 5000;

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    if (!isAutoPlaying || isHovering) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % testimonials.length;
      });
    }, AUTO_PLAY_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [isAutoPlaying, isHovering]);

  function showPreviousTestimonial() {
    setActiveIndex((currentIndex) => {
      return (
        currentIndex -
        1 +
        testimonials.length
      ) % testimonials.length;
    });
  }

  function showNextTestimonial() {
    setActiveIndex((currentIndex) => {
      return (currentIndex + 1) % testimonials.length;
    });
  }

  return (
    <div className="overflow-hidden">
      <TestimonialsHero />

      <section className="border-t border-white/10 py-20 sm:py-24 lg:py-32">
        <PageContainer>
          <SectionHeading
            eyebrow="Recommendations"
            title="What people say about working with me"
            description="This section is ready for genuine recommendations from mentors, classmates, faculty members and project collaborators."
          />

          <div
            className="relative mx-auto mt-14 max-w-5xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-signature-gradient opacity-10 blur-3xl" />

            <div className="surface-card relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-14">
              <div className="absolute right-6 top-6 text-white/5 sm:right-10 sm:top-10">
                <Quote className="size-24 sm:size-32" />
              </div>

              <AnimatePresence mode="wait">
                <TestimonialCard
                  key={activeTestimonial.id}
                  testimonial={activeTestimonial}
                  position={activeIndex + 1}
                  total={testimonials.length}
                />
              </AnimatePresence>

              <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show testimonial ${index + 1}`}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-300",
                        index === activeIndex
                          ? "w-9 bg-signature-gradient"
                          : "w-2.5 bg-white/20 hover:bg-white/40"
                      )}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setIsAutoPlaying(
                        (currentValue) => !currentValue
                      )
                    }
                    aria-label={
                      isAutoPlaying
                        ? "Pause automatic carousel"
                        : "Start automatic carousel"
                    }
                    className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-white/20 hover:bg-white/10 hover:text-foreground"
                  >
                    {isAutoPlaying ? (
                      <Pause className="size-4" />
                    ) : (
                      <Play className="size-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={showPreviousTestimonial}
                    aria-label="Show previous testimonial"
                    className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:-translate-x-0.5 hover:border-white/20 hover:bg-white/10 hover:text-foreground"
                  >
                    <ArrowLeft className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={showNextTestimonial}
                    aria-label="Show next testimonial"
                    className="flex size-11 items-center justify-center rounded-xl bg-signature-gradient text-white shadow-glow transition-all hover:translate-x-0.5 hover:opacity-90"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <RecommendationTypes />
    </div>
  );
}

function TestimonialsHero() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32">
      <TestimonialsBackground />

      <PageContainer>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl"
          >
            <Sparkles className="size-4 text-cyan-300" />
            Experiences and recommendations
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
            }}
            className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
          >
            Trust built through{" "}
            <span className="text-signature-gradient">
              learning and teamwork
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.2,
            }}
            className="mx-auto mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            Recommendations help visitors understand how I
            communicate, collaborate, learn and contribute while
            working with other people.
          </motion.p>
        </div>
      </PageContainer>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  position,
  total,
}: {
  testimonial: Testimonial;
  position: number;
  total: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        x: 45,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -45,
      }}
      transition={{
        duration: 0.4,
      }}
      className="relative z-10"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
          <MessageSquareQuote className="size-4" />
          {testimonial.relationship}
        </div>

        <p className="text-sm text-muted-foreground">
          {String(position).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
      </div>

      <div className="mt-8 flex gap-1 text-amber-300">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-current"
          />
        ))}
      </div>

      <blockquote className="mt-6 max-w-4xl font-display text-xl font-medium leading-9 text-foreground sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[1.5]">
        “{testimonial.message}”
      </blockquote>

      <div className="mt-10 flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-signature-gradient font-display text-lg font-bold text-white shadow-glow">
          {testimonial.initials}
        </div>

        <div>
          <p className="font-display text-lg font-semibold">
            {testimonial.name}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {testimonial.role}
          </p>

          <p className="mt-1 text-xs text-cyan-300">
            {testimonial.organisation}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function RecommendationTypes() {
  const recommendationTypes = [
    {
      title: "Faculty feedback",
      description:
        "Comments about academic effort, discipline and technical improvement.",
      icon: "01",
    },
    {
      title: "Mentor feedback",
      description:
        "Comments about development progress, problem-solving and learning ability.",
      icon: "02",
    },
    {
      title: "Team feedback",
      description:
        "Comments about communication, responsibility and project collaboration.",
      icon: "03",
    },
  ];

  return (
    <section className="border-t border-white/10 bg-white/[0.02] py-20 sm:py-24">
      <PageContainer>
        <SectionHeading
          eyebrow="Build credibility"
          title="Useful recommendations to collect"
          description="Ask people who have genuinely worked or studied with you to provide a short and specific recommendation."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {recommendationTypes.map((item, index) => (
            <motion.article
              key={item.title}
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="surface-card rounded-3xl p-6"
            >
              <span className="font-display text-sm font-bold text-cyan-300">
                {item.icon}
              </span>

              <h3 className="mt-5 font-display text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
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

function TestimonialsBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        animate={{
          x: [0, 70, 0],
          y: [0, 50, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-8 size-[30rem] rounded-full bg-violet-600/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 65, 0],
          scale: [1, 0.92, 1],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 top-1/3 size-[28rem] rounded-full bg-cyan-500/10 blur-3xl"
      />
    </div>
  );
}