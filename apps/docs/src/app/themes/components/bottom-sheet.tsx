"use client";

import type {ReactNode} from "react";

import {
  AnimatePresence,
  animate,
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import {Dialog, Modal, ModalOverlay} from "react-aria-components";

const MotionModal = motion.create(Modal);
const MotionModalOverlay = motion.create(ModalOverlay);

const inertiaTransition = {
  bounceDamping: 40,
  bounceStiffness: 300,
  timeConstant: 300,
  type: "inertia" as const,
};

const staticTransition = {
  duration: 0.5,
  ease: cubicBezier(0.32, 0.72, 0, 1),
};

const SHEET_HEIGHT = 600; // Total height of the sheet
const SNAP_HEIGHT = 320; // Height visible at snap position
const SNAP_OFFSET = SHEET_HEIGHT - SNAP_HEIGHT; // Offset to show snap height

interface BottomSheetProps {
  children?: ReactNode;
  id?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function BottomSheet({children, id, isOpen, onOpenChange}: BottomSheetProps) {
  const y = useMotionValue(SHEET_HEIGHT);
  const bgOpacity = useTransform(y, [0, SHEET_HEIGHT], [0.4, 0]);
  const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  return (
    <AnimatePresence>
      {isOpen ? (
        <MotionModalOverlay
          isDismissable
          isOpen
          className="fixed inset-0 z-100"
          style={{backgroundColor: bg as unknown as string}}
          onOpenChange={onOpenChange}
        >
          <MotionModal
            animate={{y: SNAP_OFFSET}}
            className="absolute bottom-0 w-full rounded-t-3xl bg-background shadow-lg will-change-transform"
            drag="y"
            dragConstraints={{top: SNAP_OFFSET}}
            exit={{y: SHEET_HEIGHT}}
            initial={{y: SHEET_HEIGHT}}
            transition={staticTransition}
            style={{
              height: SHEET_HEIGHT,
              y,
            }}
            onDragEnd={(_e, {offset, velocity}) => {
              if (offset.y > SNAP_HEIGHT * 0.5 || velocity.y > 10) {
                onOpenChange(false);
              } else {
                animate(y, SNAP_OFFSET, {...inertiaTransition, max: SNAP_OFFSET, min: SNAP_OFFSET});
              }
            }}
          >
            {/* Drag affordance */}
            <div className="bg-default-400 mx-auto mt-2 h-1.5 w-12 rounded-full" />
            <Dialog className="pb-5 outline-hidden" id={id}>
              {children}
            </Dialog>
          </MotionModal>
        </MotionModalOverlay>
      ) : null}
    </AnimatePresence>
  );
}
