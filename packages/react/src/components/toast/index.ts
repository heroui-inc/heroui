import type {ComponentProps} from "react";

import {
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastRegion,
  Toast as ToastRoot,
  ToastTitle,
} from "./toast";
import {ToastQueue, toast, toastQueue} from "./toast-queue";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Toast = Object.assign(ToastRoot, {
  Region: ToastRegion,
  Content: ToastContent,
  Icon: ToastIcon,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
  Queue: ToastQueue,
  toast,
});

export type Toast = {
  Props: ComponentProps<typeof ToastRoot>;
  RegionProps: ComponentProps<typeof ToastRegion>;
  ContentProps: ComponentProps<typeof ToastContent>;
  IconProps: ComponentProps<typeof ToastIcon>;
  TitleProps: ComponentProps<typeof ToastTitle>;
  DescriptionProps: ComponentProps<typeof ToastDescription>;
  ActionProps: ComponentProps<typeof ToastAction>;
  CloseProps: ComponentProps<typeof ToastClose>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  ToastRegion,
  ToastContent,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
};

export type {
  ToastCloseProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIconProps,
  ToastProps,
  ToastRegionProps,
  ToastTitleProps,
} from "./toast";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {toastVariants} from "./toast.styles";

export type {ToastVariants} from "./toast.styles";

/* -------------------------------------------------------------------------------------------------
 * Utilities
 * -----------------------------------------------------------------------------------------------*/
export {ToastQueue, toast, toastQueue};

export type {ToastQueueOptions} from "./toast-queue";
