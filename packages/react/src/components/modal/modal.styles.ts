import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const modalVariants = tv({
  defaultVariants: {
    variant: "opaque",
    scroll: "inside",
  },
  slots: {
    body: "modal__body",
    closeTrigger: "modal__close-trigger",
    container: "modal__container",
    dialog: "modal__dialog",
    footer: "modal__footer",
    header: "modal__header",
    heading: "modal__heading",
    backdrop: "modal__backdrop",
    trigger: "modal__trigger",
    icon: "modal__icon",
  },
  variants: {
    variant: {
      transparent: {
        backdrop: "modal__backdrop--transparent",
      },
      blur: {
        backdrop: "modal__backdrop--blur",
      },
      opaque: {
        backdrop: "modal__backdrop--opaque",
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
