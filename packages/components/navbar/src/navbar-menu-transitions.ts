import type {Variants} from "@heroui/motion";

export const menuVariants: Variants = {
  enter: {
    height: "calc(100vh - var(--navbar-height))",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};
