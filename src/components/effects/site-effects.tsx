"use client";

import { BackToTop } from "@/components/effects/back-to-top";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ScrollProgress } from "@/components/effects/scroll-progress";

export function SiteEffects() {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <CustomCursor />
    </>
  );
}