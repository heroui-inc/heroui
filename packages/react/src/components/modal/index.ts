import type {ComponentProps} from "react";

import {
  ModalBackdrop,
  ModalBody,
  ModalCloseTrigger,
  ModalContainer,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "./modal";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Modal = Object.assign(ModalRoot, {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Backdrop: ModalBackdrop,
  Container: ModalContainer,
  Dialog: ModalDialog,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  CloseTrigger: ModalCloseTrigger,
});

export type Modal = {
  Props: ComponentProps<typeof ModalRoot>;
  RootProps: ComponentProps<typeof ModalRoot>;
  TriggerProps: ComponentProps<typeof ModalTrigger>;
  BackdropProps: ComponentProps<typeof ModalBackdrop>;
  ContainerProps: ComponentProps<typeof ModalContainer>;
  DialogProps: ComponentProps<typeof ModalDialog>;
  HeaderProps: ComponentProps<typeof ModalHeader>;
  BodyProps: ComponentProps<typeof ModalBody>;
  FooterProps: ComponentProps<typeof ModalFooter>;
  CloseTriggerProps: ComponentProps<typeof ModalCloseTrigger>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  ModalRoot,
  ModalTrigger,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseTrigger,
};

export type {
  ModalRootProps,
  ModalRootProps as ModalProps,
  ModalTriggerProps,
  ModalBackdropProps,
  ModalContainerProps,
  ModalDialogProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseTriggerProps,
} from "./modal";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {modalVariants} from "./modal.styles";

export type {ModalVariants} from "./modal.styles";

/* -------------------------------------------------------------------------------------------------
 * Hooks
 * -----------------------------------------------------------------------------------------------*/
export {useModalState} from "./use-modal";

export type {UseModalStateProps, UseModalStateReturn} from "./use-modal";
