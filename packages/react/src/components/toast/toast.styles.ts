import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const toastVariants = tv({
  defaultVariants: {
    placement: "bottom-right",
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
      "bottom-left": {
        region: "toast-region--bottom-left",
      },
      "bottom-right": {
        region: "toast-region--bottom-right",
      },
      "top-left": {
        region: "toast-region--top-left",
      },
      "top-right": {
        region: "toast-region--top-right",
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
