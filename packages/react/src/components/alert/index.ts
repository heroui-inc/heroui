import type {ComponentProps} from "react";

import {
  AlertAction,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertRoot,
  AlertTitle,
} from "./alert";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
  Close: AlertClose,
});

export type Alert = {
  Props: ComponentProps<typeof AlertRoot>;
  RootProps: ComponentProps<typeof AlertRoot>;
  IconProps: ComponentProps<typeof AlertIcon>;
  ContentProps: ComponentProps<typeof AlertContent>;
  TitleProps: ComponentProps<typeof AlertTitle>;
  DescriptionProps: ComponentProps<typeof AlertDescription>;
  ActionProps: ComponentProps<typeof AlertAction>;
  CloseProps: ComponentProps<typeof AlertClose>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {AlertRoot, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertAction, AlertClose};

export type {
  AlertRootProps,
  AlertRootProps as AlertProps,
  AlertIconProps,
  AlertContentProps,
  AlertTitleProps,
  AlertDescriptionProps,
  AlertActionProps,
  AlertCloseProps,
} from "./alert";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {alertVariants} from "./alert.styles";

export type {AlertVariants} from "./alert.styles";
