"use client";

import type {MotionProps} from "motion/react";

import {Button, Modal, cn, useOverlayState} from "@heroui/react";
import {motion} from "motion/react";
import {useEffect} from "react";

// Keyframe values for each property (loops back to first value)
const RADIUS_KEYFRAMES = [24, 8, 0, 12, 24];
const BUTTON_BG_KEYFRAMES = ["#3b82f6", "#6366f1", "#10b981", "#f97316", "#3b82f6"];
const BUTTON_INNER_BG_KEYFRAMES = ["#93c5fd", "#a5b4fc", "#6ee7b7", "#fdba74", "#93c5fd"];

const TRANSITION: MotionProps["transition"] = {
  duration: 4,
  ease: "easeInOut",
  repeat: Infinity,
  times: [0, 0.25, 0.5, 0.75, 1] as const,
};

export function Onboarding() {
  const {isOpen, open, setOpen} = useOverlayState();

  useEffect(() => {
    const onboarding = localStorage.getItem("onboarding");

    if (!onboarding) {
      open();
      localStorage.setItem("onboarding", "true");
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Modal.Backdrop>
        <Modal.Container size="lg">
          <Modal.Dialog className="max-w-[480px]">
            <Modal.Header className="mb-4">
              <div className="flex h-64 w-full items-center justify-center rounded-xl border border-border bg-background">
                <AnimatedBlock />
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-foreground">
                  Adapt HeroUI v3 to your brand
                </p>
                <p className="text-sm leading-5 text-muted">
                  Customize colors, radius, and typography using a token system that keeps every
                  component consistent and production-ready.
                  <br />
                  <br />
                  More features and themes coming soon.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

function AnimatedBlock() {
  return (
    <motion.div
      animate={{borderRadius: RADIUS_KEYFRAMES}}
      transition={TRANSITION}
      className={cn(
        "h-[152px] w-[188px] bg-surface p-4",
        "shadow-[0_2px_4px_0_rgba(0,0,0,0.04),0_1px_2px_0_rgba(0,0,0,0.06),0_0_1px_0_rgba(0,0,0,0.06)]",
      )}
    >
      <motion.div
        animate={{borderRadius: RADIUS_KEYFRAMES}}
        className="mb-3 size-10 bg-surface-secondary"
        transition={TRANSITION}
      />
      <motion.div
        animate={{borderRadius: RADIUS_KEYFRAMES}}
        className="mb-2 h-2 w-[93px] bg-surface-secondary"
        transition={TRANSITION}
      />
      <motion.div
        animate={{borderRadius: RADIUS_KEYFRAMES}}
        className="mb-3 h-4 w-[139px] bg-surface-secondary"
        transition={TRANSITION}
      />
      <motion.div
        animate={{backgroundColor: BUTTON_BG_KEYFRAMES, borderRadius: RADIUS_KEYFRAMES}}
        className="h-6 w-[104px] px-3 py-2"
        transition={TRANSITION}
      >
        <motion.div
          animate={{backgroundColor: BUTTON_INNER_BG_KEYFRAMES, borderRadius: RADIUS_KEYFRAMES}}
          className="h-full w-full"
          transition={TRANSITION}
        />
      </motion.div>
    </motion.div>
  );
}
