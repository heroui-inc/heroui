import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const toastVariants = tv({
  defaultVariants: {
    placement: "bottom",
    variant: "default",
  },
  slots: {
    action: "toast__action",
    close: "toast__close",
    content: "toast__content",
    description: "toast__description",
    icon: "toast__icon",
    region: "toast-region",
    title: "toast__title",
    toast: "toast",
  },
  variants: {
    placement: {
      bottom: {
        region: "toast-region--bottom",
      },
      "bottom end": {
        region: "toast-region--bottom-end",
      },
      "bottom start": {
        region: "toast-region--bottom-start",
      },
      top: {
        region: "toast-region--top",
      },
      "top end": {
        region: "toast-region--top-end",
      },
      "top start": {
        region: "toast-region--top-start",
      },
    },
    variant: {
      accent: {
        toast: "toast--accent",
      },
      danger: {
        toast: "toast--danger",
      },
      default: {
        toast: "toast--default",
      },
      success: {
        toast: "toast--success",
      },
      warning: {
        toast: "toast--warning",
      },
    },
  },
});

export type ToastVariants = VariantProps<typeof toastVariants>;
