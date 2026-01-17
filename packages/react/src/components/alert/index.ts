import type {ComponentProps} from "react";

import {AlertContent, AlertDescription, AlertIndicator, AlertRoot, AlertTitle} from "./alert";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
});

export type Alert = {
  Props: ComponentProps<typeof AlertRoot>;
  RootProps: ComponentProps<typeof AlertRoot>;
  IndicatorProps: ComponentProps<typeof AlertIndicator>;
  ContentProps: ComponentProps<typeof AlertContent>;
  TitleProps: ComponentProps<typeof AlertTitle>;
  DescriptionProps: ComponentProps<typeof AlertDescription>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {AlertRoot, AlertIndicator, AlertContent, AlertTitle, AlertDescription};

export type {
  AlertRootProps,
  AlertRootProps as AlertProps,
  AlertIndicatorProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from "./alert";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {alertVariants} from "@heroui/styles";

export type {AlertVariants} from "@heroui/styles";
