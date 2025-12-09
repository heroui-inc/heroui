import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const alertDialogVariants = tv({
  defaultVariants: {
    status: "danger",
    variant: "opaque",
  },
  slots: {
    body: "alert-dialog__body",
    closeTrigger: "alert-dialog__close-trigger",
    container: "alert-dialog__container",
    dialog: "alert-dialog__dialog",
    footer: "alert-dialog__footer",
    header: "alert-dialog__header",
    heading: "alert-dialog__heading",
    icon: "alert-dialog__icon",
    backdrop: "alert-dialog__backdrop",
    trigger: "alert-dialog__trigger",
  },
  variants: {
    status: {
      default: {
        icon: "alert-dialog__icon--default",
      },
      accent: {
        icon: "alert-dialog__icon--accent",
      },
      success: {
        icon: "alert-dialog__icon--success",
      },
      warning: {
        icon: "alert-dialog__icon--warning",
      },
      danger: {
        icon: "alert-dialog__icon--danger",
      },
    },
    variant: {
      transparent: {
        backdrop: "alert-dialog__backdrop--transparent",
      },
      blur: {
        backdrop: "alert-dialog__backdrop--blur",
      },
      opaque: {
        backdrop: "alert-dialog__backdrop--opaque",
      },
    },
  },
});

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>;
