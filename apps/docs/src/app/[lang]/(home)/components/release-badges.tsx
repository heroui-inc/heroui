"use client";

import {Rocket} from "@gravity-ui/icons";
import LinkRoot from "fumadocs-core/link";
import {AnimatePresence, animate, motion, useMotionValue, useReducedMotion} from "motion/react";
import {useEffect, useMemo, useState} from "react";

interface ReleaseBadge {
  label: string;
  href: string;
  /** ISO date string (e.g. "2026-06-30") used to order badges newest-first. */
  date?: string;
}

interface ReleaseBadgesProps {
  badges: ReleaseBadge[];
  /** Autoplay interval in milliseconds. */
  intervalMs?: number;
}

// Soft, fluid settle for the badge slide (Apple-style spring, minimal bounce).
const slideSpring = {bounce: 0.18, type: "spring", visualDuration: 0.4} as const;
// Quick ease-out fade so opacity never lingers behind the movement.
const fadeOut = {duration: 0.22, ease: [0.215, 0.61, 0.355, 1]} as const;

function BadgePill({badge}: {badge: ReleaseBadge}) {
  return (
    <LinkRoot
      className="flex items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-xs text-accent-soft-foreground transition-colors hover:bg-accent-soft-hover"
      href={badge.href}
    >
      <Rocket className="size-3 shrink-0 text-accent-soft-foreground" />
      <span className="max-w-60 truncate sm:max-w-full">{badge.label}</span>
    </LinkRoot>
  );
}

export function ReleaseBadges({badges, intervalMs = 5000}: ReleaseBadgesProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  // Order badges newest-first so the latest release is shown first. Badges
  // without a valid date sink to the bottom while preserving their relative
  // order (stable sort).
  const sortedBadges = useMemo(() => {
    const toTime = (badge: ReleaseBadge): number => {
      if (!badge.date) return Number.NEGATIVE_INFINITY;

      const time = new Date(badge.date).getTime();

      return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
    };

    return [...badges].sort((a, b) => toTime(b) - toTime(a));
  }, [badges]);

  const count = sortedBadges.length;

  // Autoplay: drive a single progress value (transform-only fill) and advance
  // on completion. Stopping retains the value, so hover/focus pause + resume
  // and manual jumps stay in sync and interruptible.
  useEffect(() => {
    if (count <= 1 || paused) return;

    if (reduceMotion) {
      const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);

      return () => clearInterval(id);
    }

    const remaining = (1 - progress.get()) * intervalMs;
    const controls = animate(progress, 1, {
      duration: remaining / 1000,
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setIndex((i) => (i + 1) % count);
      },
    });

    return () => controls.stop();
  }, [index, paused, reduceMotion, count, intervalMs, progress]);

  if (count === 0) return null;

  // Single highlight: render the plain badge (no carousel chrome).
  if (count === 1) {
    const [only] = sortedBadges;

    return only ? <BadgePill badge={only} /> : null;
  }

  const activeIndex = index % count;
  const active = sortedBadges[activeIndex];

  if (!active) return null;

  return (
    <div
      className="flex h-6 items-center justify-center"
      onBlurCapture={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={activeIndex}
          animate={{opacity: 1, y: 0}}
          exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -10}}
          initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 10}}
          style={{willChange: "transform, opacity"}}
          transition={
            reduceMotion ? {duration: 0} : {default: slideSpring, opacity: fadeOut, y: slideSpring}
          }
        >
          <BadgePill badge={active} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
