"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX: shouldReduceMotion
          ? scrollYProgress
          : smoothProgress,
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[10000] h-1 origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
    />
  );
}