import type {ComponentProps} from "react";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDialog,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerHeading,
  DrawerRoot,
  DrawerTrigger,
} from "./drawer";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Backdrop: DrawerBackdrop,
  Content: DrawerContent,
  Dialog: DrawerDialog,
  Header: DrawerHeader,
  Heading: DrawerHeading,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Handle: DrawerHandle,
  CloseTrigger: DrawerCloseTrigger,
});

export type Drawer = {
  Props: ComponentProps<typeof DrawerRoot>;
  RootProps: ComponentProps<typeof DrawerRoot>;
  TriggerProps: ComponentProps<typeof DrawerTrigger>;
  BackdropProps: ComponentProps<typeof DrawerBackdrop>;
  ContentProps: ComponentProps<typeof DrawerContent>;
  DialogProps: ComponentProps<typeof DrawerDialog>;
  HeaderProps: ComponentProps<typeof DrawerHeader>;
  HeadingProps: ComponentProps<typeof DrawerHeading>;
  BodyProps: ComponentProps<typeof DrawerBody>;
  FooterProps: ComponentProps<typeof DrawerFooter>;
  HandleProps: ComponentProps<typeof DrawerHandle>;
  CloseTriggerProps: ComponentProps<typeof DrawerCloseTrigger>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  DrawerRoot,
  DrawerTrigger,
  DrawerBackdrop,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
  DrawerBody,
  DrawerFooter,
  DrawerHandle,
  DrawerCloseTrigger,
};

export type {
  DrawerRootProps,
  DrawerRootProps as DrawerProps,
  DrawerTriggerProps,
  DrawerBackdropProps,
  DrawerContentProps,
  DrawerDialogProps,
  DrawerHeaderProps,
  DrawerHeadingProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerHandleProps,
  DrawerCloseTriggerProps,
} from "./drawer";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {drawerVariants} from "@heroui/styles";

export type {DrawerVariants} from "@heroui/styles";
