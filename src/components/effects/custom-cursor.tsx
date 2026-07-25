"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();

  const [isPointerDevice, setIsPointerDevice] =
    useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] =
    useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothX = useSpring(cursorX, {
    stiffness: 500,
    damping: 35,
    mass: 0.2,
  });

  const smoothY = useSpring(cursorY, {
    stiffness: 500,
    damping: 35,
    mass: 0.2,
  });

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(pointer: fine) and (hover: hover)"
    );

    function updatePointerDevice() {
      setIsPointerDevice(pointerQuery.matches);
    }

    updatePointerDevice();

    pointerQuery.addEventListener(
      "change",
      updatePointerDevice
    );

    return () => {
      pointerQuery.removeEventListener(
        "change",
        updatePointerDevice
      );
    };
  }, []);

  useEffect(() => {
    if (!isPointerDevice || shouldReduceMotion) {
      return;
    }

    function handleMouseMove(event: MouseEvent) {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);

      const target = event.target;

      if (!(target instanceof Element)) {
        setIsHoveringInteractive(false);
        return;
      }

      const interactiveElement = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']"
      );

      setIsHoveringInteractive(Boolean(interactiveElement));
    }

    function handleMouseLeave() {
      setIsVisible(false);
    }

    function handleMouseEnter() {
      setIsVisible(true);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );
    document.documentElement.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [
    cursorX,
    cursorY,
    isPointerDevice,
    shouldReduceMotion,
  ]);

  if (
    !isPointerDevice ||
    shouldReduceMotion
  ) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHoveringInteractive ? 0.7 : 1,
        }}
        transition={{
          opacity: {
            duration: 0.15,
          },
          scale: {
            duration: 0.2,
          },
        }}
        className="pointer-events-none fixed left-0 top-0 z-[10001] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300"
      />

      <motion.div
        aria-hidden="true"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHoveringInteractive ? 1.55 : 1,
        }}
        transition={{
          opacity: {
            duration: 0.15,
          },
          scale: {
            duration: 0.2,
          },
        }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/60 bg-cyan-300/5 backdrop-blur-[1px]"
      />
    </>
  );
}