"use client";

import type {MotionValue} from "motion/react";

import {
  animate,
  motion,
  transform,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import {useCallback, useEffect, useRef, useState} from "react";

const CARD_COUNT = 5;
const PAUSE_MS = 3000;
const FLIP_SECONDS = 0.8;
const DRAG_THRESHOLD = 40;

function getWrappedDistance(progress: number, index: number) {
  const raw = (((progress - index) % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;

  return raw > CARD_COUNT / 2 ? raw - CARD_COUNT : raw;
}

function CardSlot({
  children,
  direction,
  index,
  progress,
}: {
  children: React.ReactNode;
  direction: number;
  index: number;
  progress: MotionValue<number>;
}) {
  const distanceFromFront = useTransform(progress, (latest) => getWrappedDistance(latest, index));
  const distanceFromFrontABS = useTransform(distanceFromFront, (latest) => Math.abs(latest));

  const [isFirst, setIsFirst] = useState(Math.abs(getWrappedDistance(progress.get(), index)) < 0.5);

  useMotionValueEvent(distanceFromFront, "change", (latest) => {
    const previous = distanceFromFront.getPrevious();

    if (previous === undefined) return;

    if (latest * previous <= 0) setIsFirst(true);
    if (Math.abs(latest) >= 1) setIsFirst(false);
  });

  const scale = useTransform(distanceFromFrontABS, [0, 0.5, 1], isFirst ? [1, 0.95, 1] : [1, 1, 1]);

  const x = useTransform(
    distanceFromFront,
    [-1, -0.5, 0, 0.5, 1],
    isFirst ? ["12%", "77%", "0%", "-77%", "-12%"] : ["12%", "5%", "0%", "-5%", "-12%"],
    {clamp: false},
  );

  const z = useTransform(distanceFromFrontABS, [0, 1], [0, -170], {clamp: false});

  const rotateZ = useTransform(distanceFromFront, [0, 1], [0, -2.4], {clamp: false});

  const rotateY = useTransform(
    distanceFromFrontABS,
    (value) => transform(value % 1, [0, 0.5, 1], isFirst ? [0, -45, 0] : [0, -20, 0]) * direction,
  );

  const zIndex = useTransform(distanceFromFrontABS, [0, 0.5, 1, 2, 2.5], [10, 1, 0, -1, -2]);

  const opacity = useTransform(distanceFromFrontABS, [0, 1, 2, 2.15], [1, 1, 0.6, 0]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 m-auto h-fit w-fit"
      style={{
        opacity,
        rotateY,
        rotateZ,
        scale,
        transformPerspective: 1000,
        x,
        z,
        zIndex,
      }}
    >
      {children}
    </motion.div>
  );
}

function useAutoPlay(progress: MotionValue<number>, isDragging: React.RefObject<boolean>) {
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (controlsRef.current) controlsRef.current.stop();
  }, []);

  const schedule = useCallback(() => {
    clear();

    const loop = () => {
      if (isDragging.current) return;
      const current = progress.get();
      const target = Math.round(current) + 1;

      controlsRef.current = animate(progress, target, {
        duration: FLIP_SECONDS,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => {
          if (!isDragging.current) {
            timeoutRef.current = setTimeout(loop, PAUSE_MS);
          }
        },
      });
    };

    timeoutRef.current = setTimeout(loop, PAUSE_MS);
  }, [progress, isDragging, clear]);

  useEffect(() => {
    schedule();

    return clear;
  }, [schedule, clear]);

  return {clear, schedule};
}

export function CardStack({children}: {children: React.ReactNode[]}) {
  const progress = useMotionValue(0);
  const progressStep = useTransform(progress, (latest) => Math.floor(latest));
  const [direction, setDirection] = useState(1);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const {clear, schedule} = useAutoPlay(progress, isDraggingRef);

  useMotionValueEvent(progressStep, "change", (latest) => {
    const previous = progressStep.getPrevious();

    if (previous === undefined) return;
    setDirection(previous > latest ? -1 : 1);
  });

  useMotionValueEvent(progress, "change", (latest) => {
    if (latest % 1 === 0) {
      setDirection(1);
    }
  });

  const snapTo = useCallback(
    (target: number) => {
      animate(progress, target, {
        duration: FLIP_SECONDS,
        ease: [0.4, 0, 0.2, 1],
        onComplete: () => schedule(),
      });
    },
    [progress, schedule],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      clear();
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartProgressRef.current = progress.get();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [progress, clear],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      const containerWidth = containerRef.current?.offsetWidth ?? 400;

      progress.set(dragStartProgressRef.current - dx / containerWidth);
    },
    [progress],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);

      const dx = e.clientX - dragStartXRef.current;
      const current = progress.get();
      const rounded = Math.round(current);

      if (Math.abs(dx) > DRAG_THRESHOLD) {
        const next = dx < 0 ? Math.ceil(current) : Math.floor(current);
        const target =
          next === rounded && dx < 0
            ? rounded + 1
            : next === rounded && dx > 0
              ? rounded - 1
              : next;

        snapTo(target);
      } else {
        snapTo(rounded);
      }
    },
    [progress, snapTo],
  );

  const cards = Array.isArray(children) ? children : [children];

  return (
    <div
      ref={containerRef}
      className="relative isolate mt-10 h-[480px] w-[400px] cursor-grab select-none active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {cards.map((card, i) => (
        <CardSlot key={i} direction={direction} index={i} progress={progress}>
          {card}
        </CardSlot>
      ))}
    </div>
  );
}
