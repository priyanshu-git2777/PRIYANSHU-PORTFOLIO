"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 500);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title="Back to top"
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.8,
          }}
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.92,
          }}
          className="fixed bottom-24 left-5 z-[60] flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-background/80 text-foreground shadow-xl backdrop-blur-xl transition-colors hover:border-cyan-400/30 hover:text-cyan-300 sm:bottom-7 sm:left-7"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}