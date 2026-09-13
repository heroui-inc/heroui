import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const drawerVariants = tv({
  defaultVariants: {
    placement: "bottom",
    variant: "opaque",
  },
  slots: {
    backdrop: "drawer__backdrop",
    body: "drawer__body",
    closeTrigger: "drawer__close-trigger",
    content: "drawer__content",
    dialog: "drawer__dialog",
    footer: "drawer__footer",
    handle: "drawer__handle",
    header: "drawer__header",
    heading: "drawer__heading",
    trigger: "drawer__trigger",
  },
  variants: {
    placement: {
      bottom: {
        content: "drawer__content--bottom",
        dialog: "drawer__dialog--bottom",
      },
      left: {
        content: "drawer__content--left",
        dialog: "drawer__dialog--left",
      },
      right: {
        content: "drawer__content--right",
        dialog: "drawer__dialog--right",
      },
      top: {
        content: "drawer__content--top",
        dialog: "drawer__dialog--top",
      },
    },
    variant: {
      blur: {
        backdrop: "drawer__backdrop--blur",
      },
      opaque: {
        backdrop: "drawer__backdrop--opaque",
      },
      transparent: {
        backdrop: "drawer__backdrop--transparent",
      },
    },
  },
});

export type DrawerVariants = VariantProps<typeof drawerVariants>;
