import type {ComponentProps} from "react";

import {
  ToastAction,
  ToastClose,
  ToastContainer,
  ToastContent,
  ToastDescription,
  ToastIcon,
  Toast as ToastRoot,
  ToastTitle,
} from "./toast";
import {ToastQueue, toast, toastQueue} from "./toast-queue";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Toast = Object.assign(ToastRoot, {
  Container: ToastContainer,
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
  ContainerProps: ComponentProps<typeof ToastContainer>;
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
  ToastContainer,
  ToastContent,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
};

export type {
  ToastCloseProps,
  ToastContainerProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIconProps,
  ToastProps,
  ToastTitleProps,
} from "./toast";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {toastVariants} from "@heroui/styles";

export type {ToastVariants} from "@heroui/styles";

/* -------------------------------------------------------------------------------------------------
 * Utilities
 * -----------------------------------------------------------------------------------------------*/
export {ToastQueue, toast, toastQueue};

export type {ToastQueueOptions} from "./toast-queue";
