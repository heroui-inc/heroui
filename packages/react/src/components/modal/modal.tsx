"use client";

import type {ComponentProps, ComponentRef, HTMLAttributes, ReactNode} from "react";
import type {ButtonProps, DialogProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {createContext, forwardRef, useContext, useMemo} from "react";
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  DialogTrigger as ModalTriggerPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {CloseIcon} from "../icons";

import {modalVariants} from "./modal.styles";

type ModalProps = ComponentProps<typeof ModalTriggerPrimitive> & {
  /**
   * The backdrop variant.
   * @default "opaque"
   */
  backdrop?: "opaque" | "blur" | "transparent";
  /**
   * The placement of the modal.
   * @default "auto"
   */
  placement?: "auto" | "center" | "top" | "bottom";
  /**
   * The size of the dialog.
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /**
   * The scroll behavior of the modal.
   * @default "normal"
   */
  scrollBehavior?: "normal" | "inside" | "outside";
};

const ModalContext = createContext<{
  slots?: ReturnType<typeof modalVariants>;
}>({});

const ModalRoot = ({
  backdrop = "opaque",
  children,
  placement = "auto",
  scrollBehavior = "normal",
  size = "md",
  ...props
}: ModalProps) => {
  const slots = useMemo(() => {
    return modalVariants({backdrop, placement, scrollBehavior, size});
  }, [backdrop, placement, scrollBehavior, size]);

  const contextValue = useMemo(() => ({slots}), [slots]);

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalTriggerPrimitive data-modal-root {...props}>
        {children}
      </ModalTriggerPrimitive>
    </ModalContext.Provider>
  );
};

ModalRoot.displayName = "HeroUI.Modal";

const ModalTrigger = ({children, className, ...props}: HTMLAttributes<HTMLDivElement>) => {
  const {slots} = useContext(ModalContext);

  return (
    <PressablePrimitive>
      <div data-modal-trigger className={slots?.trigger({className})} role="button" {...props}>
        {children}
      </div>
    </PressablePrimitive>
  );
};

ModalTrigger.displayName = "HeroUI.Modal.Trigger";

type ModalOverlayProps = ComponentProps<typeof ModalOverlayPrimitive>;

const ModalOverlay = forwardRef<ComponentRef<typeof ModalOverlayPrimitive>, ModalOverlayProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <ModalOverlayPrimitive
        ref={ref}
        data-modal-overlay
        className={composeTwRenderProps(className, slots?.overlay())}
        {...props}
      >
        {children}
      </ModalOverlayPrimitive>
    );
  },
);

ModalOverlay.displayName = "HeroUI.Modal.Overlay";

type ModalContentProps = ComponentProps<typeof ModalPrimitive>;

const ModalContent = forwardRef<ComponentRef<typeof ModalPrimitive>, ModalContentProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <ModalPrimitive
        {...props}
        ref={ref}
        data-modal-content
        className={composeTwRenderProps(className, slots?.content())}
      >
        {children}
      </ModalPrimitive>
    );
  },
);

ModalContent.displayName = "HeroUI.Modal.Content";

interface ModalDialogProps extends Omit<DialogProps, "children"> {
  children: ReactNode | ((opts: {close: () => void}) => ReactNode);
}

const ModalDialog = forwardRef<HTMLElement, ModalDialogProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <DialogPrimitive
        ref={ref}
        data-modal-dialog
        className={slots?.dialog({className})}
        {...props}
      >
        {children}
      </DialogPrimitive>
    );
  },
);

ModalDialog.displayName = "HeroUI.Modal.Dialog";

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({align, children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <div ref={ref} data-modal-header className={slots?.header({align, className})} {...props}>
        {children}
      </div>
    );
  },
);

ModalHeader.displayName = "HeroUI.Modal.Header";

const ModalIcon = ({children, className, ...props}: HTMLAttributes<HTMLDivElement>) => {
  const {slots} = useContext(ModalContext);

  return (
    <div data-modal-icon className={slots?.icon({className})} {...props}>
      {children}
    </div>
  );
};

ModalIcon.displayName = "HeroUI.Modal.Icon";

const ModalTitle = forwardRef<
  ComponentRef<typeof HeadingPrimitive>,
  ComponentProps<typeof HeadingPrimitive>
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(ModalContext);

  return (
    <HeadingPrimitive
      ref={ref}
      data-modal-title
      className={slots?.title({className})}
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
});

ModalTitle.displayName = "HeroUI.Modal.Title";

const ModalDescription = ({children, className, ...props}: HTMLAttributes<HTMLDivElement>) => {
  const {slots} = useContext(ModalContext);

  return (
    <div data-modal-description className={slots?.description({className})} {...props}>
      {children}
    </div>
  );
};

ModalDescription.displayName = "HeroUI.Modal.Description";

const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <div ref={ref} data-modal-body className={slots?.body({className})} {...props}>
        {children}
      </div>
    );
  },
);

ModalBody.displayName = "HeroUI.Modal.Body";

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  layout?: "horizontal" | "vertical";
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({children, className, layout, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <div ref={ref} data-modal-footer className={slots?.footer({layout, className})} {...props}>
        {children}
      </div>
    );
  },
);

ModalFooter.displayName = "HeroUI.Modal.Footer";

/**
 * Close trigger button for Modal, positioned in the top-right corner by default.
 *
 * @example
 * <Modal.CloseTrigger />
 *
 * @example
 * <Modal.CloseTrigger>Close</Modal.CloseTrigger>
 *
 * @example
 * <Modal.CloseTrigger asChild>
 *   <CloseButton />
 * </Modal.CloseTrigger>
 */
interface ModalCloseTriggerProps extends ButtonProps {
  /**
   * When true, the CloseTrigger will pass all props to its child element.
   * Useful for composing with custom components like CloseButton.
   */
  asChild?: boolean;
}

const ModalCloseTrigger = forwardRef<ComponentRef<typeof ButtonPrimitive>, ModalCloseTriggerProps>(
  ({asChild = false, children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    if (asChild) {
      return <SlotPrimitive slot="close">{children as ReactNode}</SlotPrimitive>;
    }

    return (
      <ButtonPrimitive
        {...props}
        ref={ref}
        data-modal-close-trigger
        className={composeTwRenderProps(className, slots?.closeTrigger())}
        slot="close"
      >
        {(values) =>
          typeof children === "function"
            ? children(values)
            : (children ?? <CloseIcon data-modal-default-close-icon />)
        }
      </ButtonPrimitive>
    );
  },
);

ModalCloseTrigger.displayName = "HeroUI.Modal.CloseTrigger";

const CompoundModal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Overlay: ModalOverlay,
  Dialog: ModalDialog,
  Header: ModalHeader,
  Icon: ModalIcon,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  CloseTrigger: ModalCloseTrigger,
});

export type {
  ModalProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalDialogProps,
  ModalHeaderProps,
  ModalFooterProps,
};

export default CompoundModal;
