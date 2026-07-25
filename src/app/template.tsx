"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

type RootTemplateProps = {
  children: ReactNode;
};

export default function RootTemplate({
  children,
}: RootTemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 14,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}