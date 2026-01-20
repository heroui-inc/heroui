import type {ComponentProps} from "react";

import {
  ToastActionButton,
  ToastCloseButton,
  ToastContainer,
  ToastContent,
  ToastDescription,
  ToastIndicator,
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
  Indicator: ToastIndicator,
  Title: ToastTitle,
  Description: ToastDescription,
  ActionButton: ToastActionButton,
  CloseButton: ToastCloseButton,
  Queue: ToastQueue,
  toast,
});

export type Toast = {
  Props: ComponentProps<typeof ToastRoot>;
  ContainerProps: ComponentProps<typeof ToastContainer>;
  ContentProps: ComponentProps<typeof ToastContent>;
  IndicatorProps: ComponentProps<typeof ToastIndicator>;
  TitleProps: ComponentProps<typeof ToastTitle>;
  DescriptionProps: ComponentProps<typeof ToastDescription>;
  ActionProps: ComponentProps<typeof ToastActionButton>;
  CloseButtonProps: ComponentProps<typeof ToastCloseButton>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  ToastContainer,
  ToastContent,
  ToastIndicator,
  ToastTitle,
  ToastDescription,
  ToastActionButton,
  ToastCloseButton,
};

export type {
  ToastCloseButtonProps,
  ToastContainerProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIndicatorProps,
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

/* -------------------------------------------------------------------------------------------------
 * Constants
 * -----------------------------------------------------------------------------------------------*/
export {DEFAULT_MAX_VISIBLE_TOAST, DEFAULT_GAP} from "./constants";

export type {ToastQueueOptions, ToastContentValue} from "./toast-queue";
