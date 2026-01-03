import {TRANSITION_EASINGS} from "@heroui/framer-utils";

export const scaleInOut = {
  enter: {
    y: "var(--slide-enter)",
    opacity: 1,
    willChange: "auto",
    transition: {
      opacity: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease,
      },
      y: {
        type: "spring",
        bounce: 0,
        duration: 0.6,
      },
    },
  },
  exit: {
    y: "var(--slide-exit)",
    opacity: 0,
    willChange: "transform",
    transition: {
      duration: 0.3,
      ease: TRANSITION_EASINGS.ease,
    },
  },
};
