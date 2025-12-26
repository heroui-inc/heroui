import type {ComponentProps} from "react";

import {
  ToastClose,
  ToastContent,
  ToastDescription,
  HeroUIToastQueue as ToastQueue,
  ToastRegion,
  Toast as ToastRoot,
  ToastTitle,
} from "./toast";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Toast = Object.assign(ToastRoot, {
  Region: ToastRegion,
  Content: ToastContent,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
  Queue: ToastQueue,
});

export type Toast = {
  Props: ComponentProps<typeof ToastRoot>;
  RegionProps: ComponentProps<typeof ToastRegion>;
  ContentProps: ComponentProps<typeof ToastContent>;
  TitleProps: ComponentProps<typeof ToastTitle>;
  DescriptionProps: ComponentProps<typeof ToastDescription>;
  CloseProps: ComponentProps<typeof ToastClose>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ToastRegion, ToastContent, ToastTitle, ToastDescription, ToastClose, ToastQueue};

export type {
  ToastCloseProps,
  ToastContentProps,
  ToastDescriptionProps,
  ToastProps,
  ToastQueueOptions,
  ToastRegionProps,
  ToastTitleProps,
} from "./toast";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {toastVariants} from "./toast.styles";

export type {ToastVariants} from "./toast.styles";
