import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const modalVariants = tv({
  slots: {
    trigger: "modal__trigger",
    overlay: "modal__overlay",
    content: "modal__content",
    dialog: "modal__dialog",
    header: "modal__header",
    icon: "modal__icon",
    title: "modal__title",
    description: "modal__description",
    body: "modal__body",
    footer: "modal__footer",
    closeTrigger: "modal__close-trigger",
  },
  variants: {
    size: {
      sm: {
        dialog: "modal__dialog--sm",
      },
      md: {
        dialog: "modal__dialog--md",
      },
      lg: {
        dialog: "modal__dialog--lg",
      },
      xl: {
        dialog: "modal__dialog--xl",
      },
      full: {
        dialog: "modal__dialog--full",
      },
    },
    placement: {
      auto: {
        content: "modal__content--auto",
        dialog: "modal__dialog--auto",
      },
      center: {
        content: "modal__content--center",
      },
      top: {
        content: "modal__content--top",
      },
      bottom: {
        content: "modal__content--bottom",
      },
    },
    backdrop: {
      opaque: {
        overlay: "modal__overlay--opaque",
      },
      blur: {
        overlay: "modal__overlay--blur",
      },
      transparent: {
        overlay: "modal__overlay--transparent",
      },
    },
    scrollBehavior: {
      normal: {
        dialog: "modal__dialog--scroll-normal",
        body: "modal__body--scroll-normal",
      },
      inside: {
        dialog: "modal__dialog--scroll-inside",
        body: "modal__body--scroll-inside",
      },
      outside: {
        content: "modal__content--scroll-outside",
        dialog: "modal__dialog--scroll-outside",
        body: "modal__body--scroll-outside",
      },
    },
    align: {
      left: {},
      center: {
        header: "modal__header--center",
      },
    },
    layout: {
      horizontal: {},
      vertical: {
        footer: "modal__footer--vertical",
      },
    },
  },
  defaultVariants: {
    size: "md",
    placement: "auto",
    backdrop: "opaque",
    scrollBehavior: "normal",
  },
});

export type ModalVariants = VariantProps<typeof modalVariants>;
