"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const refinementLoaderStatusMessages = [
  "Analyzing ACE sub-competencies…",
  "Drafting professional GAINS feedback…",
  "Finalizing holistic objectives…",
] as const;

const refinementLoaderStatusIntervalMs = 2_500;

const refinementLoaderMotionDurationSeconds = 0.32;

type EchoRefinementMinimalLoaderProps = {
  isVisible: boolean;
};

export const EchoRefinementMinimalLoader = ({ isVisible }: EchoRefinementMinimalLoaderProps) => {
  const prefersReducedMotion = useReducedMotion();
  const motionDuration = prefersReducedMotion ? 0 : refinementLoaderMotionDurationSeconds;
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setStatusIndex(0);
      return;
    }
    const intervalId = window.setInterval(() => {
      setStatusIndex(
        (previous) => (previous + 1) % refinementLoaderStatusMessages.length,
      );
    }, refinementLoaderStatusIntervalMs);
    return () => window.clearInterval(intervalId);
  }, [isVisible]);

  const activeStatus = refinementLoaderStatusMessages[statusIndex];

  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.section
          key="echo-refinement-minimal-loader"
          aria-busy
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionDuration, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-5 py-10 text-center"
        >
          <div className="echo-refinement-loader-ripple" aria-hidden>
            <span className="echo-refinement-loader-ripple__ring" />
            <span className="echo-refinement-loader-ripple__ring echo-refinement-loader-ripple__ring--stagger" />
            <span className="relative z-[1] text-4xl font-bold tracking-tight text-on-surface">
              ECHO
            </span>
          </div>
          <p className="max-w-md text-xs text-on-surface-variant">
            Evaluation of Capabilities &amp; Holistic Objectives.
          </p>
          <p
            className="min-h-[1.25rem] text-sm font-medium text-on-surface"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeStatus}
          </p>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
};
