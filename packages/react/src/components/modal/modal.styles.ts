import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const modalVariants = tv({
  defaultVariants: {
    variant: "solid",
    scroll: "inside",
  },
  slots: {
    body: "modal__body",
    closeTrigger: "modal__close-trigger",
    container: "modal__container",
    dialog: "modal__dialog",
    footer: "modal__footer",
    header: "modal__header",
    backdrop: "modal__backdrop",
    trigger: "modal__trigger",
  },
  variants: {
    variant: {
      transparent: {
        backdrop: "modal__backdrop--transparent",
      },
      blur: {
        backdrop: "modal__backdrop--blur",
      },
      solid: {
        backdrop: "modal__backdrop--solid",
      },
    },
    scroll: {
      inside: {
        body: "modal__body--scroll-inside",
        dialog: "modal__dialog--scroll-inside",
      },
      outside: {
        body: "modal__body--scroll-outside",
        container: "modal__container--scroll-outside",
        dialog: "modal__dialog--scroll-outside",
      },
    },
  },
});

export type ModalVariants = VariantProps<typeof modalVariants>;
