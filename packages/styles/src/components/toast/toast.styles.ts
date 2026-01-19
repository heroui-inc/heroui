import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const toastVariants = tv({
  defaultVariants: {
    placement: "bottom",
    variant: "default",
  },
  slots: {
    action: "toast__action",
    close: "toast__close-button",
    content: "toast__content",
    description: "toast__description",
    indicator: "toast__indicator",
    region: "toast-region",
    title: "toast__title",
    toast: "toast",
  },
  variants: {
    placement: {
      bottom: {
        region: "toast-region--bottom",
        toast: "toast--bottom",
      },
      "bottom end": {
        region: "toast-region--bottom-end",
        toast: "toast--bottom-end",
      },
      "bottom start": {
        region: "toast-region--bottom-start",
        toast: "toast--bottom-start",
      },
      top: {
        region: "toast-region--top",
        toast: "toast--top",
      },
      "top end": {
        region: "toast-region--top-end",
        toast: "toast--top-end",
      },
      "top start": {
        region: "toast-region--top-start",
        toast: "toast--top-start",
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
