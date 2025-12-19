import type {ComponentProps} from "react";

import {
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseTrigger,
  AlertDialogContainer,
  AlertDialogDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogHeading,
  AlertDialogIcon,
  AlertDialogRoot,
  AlertDialogTrigger,
} from "./alert-dialog";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const AlertDialog = Object.assign(AlertDialogRoot, {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Backdrop: AlertDialogBackdrop,
  Container: AlertDialogContainer,
  Dialog: AlertDialogDialog,
  Header: AlertDialogHeader,
  Heading: AlertDialogHeading,
  Body: AlertDialogBody,
  Footer: AlertDialogFooter,
  Icon: AlertDialogIcon,
  CloseTrigger: AlertDialogCloseTrigger,
});

export type AlertDialog = {
  Props: ComponentProps<typeof AlertDialogRoot>;
  RootProps: ComponentProps<typeof AlertDialogRoot>;
  TriggerProps: ComponentProps<typeof AlertDialogTrigger>;
  BackdropProps: ComponentProps<typeof AlertDialogBackdrop>;
  ContainerProps: ComponentProps<typeof AlertDialogContainer>;
  DialogProps: ComponentProps<typeof AlertDialogDialog>;
  HeaderProps: ComponentProps<typeof AlertDialogHeader>;
  HeadingProps: ComponentProps<typeof AlertDialogHeading>;
  BodyProps: ComponentProps<typeof AlertDialogBody>;
  FooterProps: ComponentProps<typeof AlertDialogFooter>;
  IconProps: ComponentProps<typeof AlertDialogIcon>;
  CloseTriggerProps: ComponentProps<typeof AlertDialogCloseTrigger>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogBackdrop,
  AlertDialogContainer,
  AlertDialogDialog,
  AlertDialogHeader,
  AlertDialogHeading,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogIcon,
  AlertDialogCloseTrigger,
};

export type {
  AlertDialogRootProps,
  AlertDialogRootProps as AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogBackdropProps,
  AlertDialogContainerProps,
  AlertDialogDialogProps,
  AlertDialogHeaderProps,
  AlertDialogHeadingProps,
  AlertDialogBodyProps,
  AlertDialogFooterProps,
  AlertDialogIconProps,
  AlertDialogCloseTriggerProps,
} from "./alert-dialog";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {alertDialogVariants} from "./alert-dialog.styles";

export type {AlertDialogVariants} from "./alert-dialog.styles";
