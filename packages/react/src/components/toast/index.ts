import type {ComponentProps} from "react";

import {
  ToastActionButton,
  ToastCloseButton,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastProvider,
  Toast as ToastRoot,
  ToastTitle,
} from "./toast";
import {ToastQueue, toast, toastQueue} from "./toast-queue";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
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
  ProviderProps: ComponentProps<typeof ToastProvider>;
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
  ToastProvider,
  ToastContent,
  ToastIndicator,
  ToastTitle,
  ToastDescription,
  ToastActionButton,
  ToastCloseButton,
};

export type {
  ToastCloseButtonProps,
  ToastProviderProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastIndicatorProps,
  ToastProps,
  ToastTitleProps,
  ToastOffsetValue,
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
export {DEFAULT_MAX_VISIBLE_TOAST, DEFAULT_GAP, DEFAULT_TOAST_TIMEOUT} from "./constants";

export type {ToastQueueOptions, ToastContentValue} from "./toast-queue";
