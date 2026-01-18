import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const modalVariants = tv({
  defaultVariants: {
    scroll: "inside",
    size: "md",
    variant: "opaque",
  },
  slots: {
    backdrop: "modal__backdrop",
    body: "modal__body",
    closeTrigger: "modal__close-trigger",
    container: "modal__container",
    dialog: "modal__dialog",
    footer: "modal__footer",
    header: "modal__header",
    heading: "modal__heading",
    icon: "modal__icon",
    trigger: "modal__trigger",
  },
  variants: {
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
    size: {
      cover: {
        dialog: "modal__dialog--cover",
      },
      full: {
        container: "modal__container--full",
        dialog: "modal__dialog--full",
      },
      lg: {
        dialog: "modal__dialog--lg",
      },
      md: {
        dialog: "modal__dialog--md",
      },
      sm: {
        dialog: "modal__dialog--sm",
      },
      xs: {
        dialog: "modal__dialog--xs",
      },
    },
    variant: {
      blur: {
        backdrop: "modal__backdrop--blur",
      },
      opaque: {
        backdrop: "modal__backdrop--opaque",
      },
      transparent: {
        backdrop: "modal__backdrop--transparent",
      },
    },
  },
});

export type ModalVariants = VariantProps<typeof modalVariants>;
