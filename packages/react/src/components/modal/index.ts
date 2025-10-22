export {
  ModalRoot,
  ModalTrigger,
  ModalOverlay,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseTrigger,
} from "./modal";
export type {
  ModalRootProps,
  ModalTriggerProps,
  ModalOverlayProps,
  ModalContainerProps,
  ModalDialogProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseTriggerProps,
} from "./modal";

export {modalVariants} from "./modal.styles";
export type {ModalVariants} from "./modal.styles";

export {useModalState} from "./use-modal";
export type {UseModalStateProps, UseModalStateReturn} from "./use-modal";

export * as Modal from "./slots";
