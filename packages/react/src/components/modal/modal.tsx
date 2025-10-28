"use client";

import type {ModalVariants} from "./modal.styles";
import type {UseModalStateReturn} from "./use-modal";
import type {ComponentProps, HTMLAttributes, ReactNode} from "react";
import type {
  ButtonProps as ButtonPrimitiveProps,
  DialogProps as DialogPrimitiveProps,
} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {createContext, useContext, useMemo} from "react";
import {
  Dialog as DialogPrimitive,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  DialogTrigger as ModalTriggerPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components";

import {isNotAsChild} from "../../utils";
import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";

import {modalVariants} from "./modal.styles";

type ModalPlacement = "auto" | "center" | "top" | "bottom";

/* -------------------------------------------------------------------------------------------------
 * Modal Context
 * -----------------------------------------------------------------------------------------------*/
type ModalContext = {
  slots?: ReturnType<typeof modalVariants>;
  placement?: ModalPlacement;
};

const ModalContext = createContext<ModalContext>({});

/* -------------------------------------------------------------------------------------------------
 * Modal Root
 * -----------------------------------------------------------------------------------------------*/
interface ModalRootProps extends ComponentProps<typeof ModalTriggerPrimitive> {
  state?: UseModalStateReturn;
}

const ModalRoot = ({children, state, ...props}: ModalRootProps) => {
  const contextValue = useMemo(() => ({slots: undefined}), []);

  const controlledProps = useMemo(() => {
    return state
      ? {
          isOpen: state.isOpen,
          onOpenChange: state.setOpen,
        }
      : {};
  }, [state?.isOpen, state?.setOpen]);

  return (
    <ModalContext value={contextValue}>
      <ModalTriggerPrimitive data-slot="modal-root" {...controlledProps} {...props}>
        {children}
      </ModalTriggerPrimitive>
    </ModalContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ModalTriggerProps extends HTMLAttributes<HTMLDivElement> {}

const ModalTrigger = ({children, className, ...props}: ModalTriggerProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <PressablePrimitive>
      <div
        className={slots?.trigger({className})}
        data-slot="modal-trigger"
        role="button"
        {...props}
      >
        {children}
      </div>
    </PressablePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Overlay
 * -----------------------------------------------------------------------------------------------*/
interface ModalOverlayProps extends ComponentProps<typeof ModalOverlayPrimitive> {
  variant?: ModalVariants["variant"];
}

const ModalOverlay = ({children, className, variant = "solid", ...props}: ModalOverlayProps) => {
  const {slots: parentSlots} = useContext(ModalContext);

  const slots = useMemo(() => {
    return modalVariants({variant});
  }, [variant]);

  const contextValue = useMemo(
    () => ({slots: {...parentSlots, ...slots}, placement: undefined}),
    [parentSlots, slots],
  );

  return (
    <ModalContext value={contextValue}>
      <ModalOverlayPrimitive
        className={composeTwRenderProps(className, slots?.overlay())}
        data-slot="modal-overlay"
        {...props}
      >
        {children}
      </ModalOverlayPrimitive>
    </ModalContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Container
 * -----------------------------------------------------------------------------------------------*/
interface ModalContainerProps extends ComponentProps<typeof ModalPrimitive> {
  placement?: ModalPlacement;
  scroll?: ModalVariants["scroll"];
}

const ModalContainer = ({
  children,
  className,
  placement = "auto",
  scroll = "inside",
  ...props
}: ModalContainerProps) => {
  const {slots: parentSlots} = useContext(ModalContext);

  const slots = useMemo(() => {
    return modalVariants({scroll});
  }, [scroll]);

  const contextValue = useMemo(
    () => ({slots: {...parentSlots, ...slots}, placement}),
    [parentSlots, slots, placement],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      <ModalPrimitive
        {...props}
        className={composeTwRenderProps(className, slots?.container())}
        data-placement={placement}
        data-slot="modal-container"
      >
        {children}
      </ModalPrimitive>
    </ModalContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Dialog
 * -----------------------------------------------------------------------------------------------*/
interface ModalDialogProps extends DialogPrimitiveProps {}

const ModalDialog = ({children, className, ...props}: ModalDialogProps) => {
  const {placement, slots} = useContext(ModalContext);

  return (
    <DialogPrimitive
      className={slots?.dialog({className})}
      data-placement={placement}
      data-slot="modal-dialog"
      {...props}
    >
      {children}
    </DialogPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Header
 * -----------------------------------------------------------------------------------------------*/
interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const ModalHeader = ({children, className, ...props}: ModalHeaderProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <div className={slots?.header({className})} data-slot="modal-header" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Body
 * -----------------------------------------------------------------------------------------------*/
interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {}

const ModalBody = ({children, className, ...props}: ModalBodyProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <div className={slots?.body({className})} data-slot="modal-body" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Footer
 * -----------------------------------------------------------------------------------------------*/
interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

const ModalFooter = ({children, className, ...props}: ModalFooterProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <div className={slots?.footer({className})} data-slot="modal-footer" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Close Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ModalCloseTriggerProps {
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}

interface ModalCloseTrigger {
  (props: {asChild: true} & ComponentProps<"button">): React.JSX.Element;
  (props: {asChild?: false} & ButtonPrimitiveProps): React.JSX.Element;
}

const ModalCloseTrigger: ModalCloseTrigger = (props) => {
  const {slots} = useContext(ModalContext);

  if (isNotAsChild(props)) {
    const {className, ...rest} = props;

    return (
      <CloseButton
        className={composeTwRenderProps(className, slots?.closeTrigger())}
        data-slot="modal-close-trigger"
        slot="close"
        {...rest}
      />
    );
  }

  const {asChild: _asChild, children, className, ...rest} = props;

  return (
    <SlotPrimitive data-slot="modal-close-trigger" slot="close" {...rest}>
      {children ?? (
        <CloseButton className={composeTwRenderProps(className, slots?.closeTrigger())} />
      )}
    </SlotPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
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
};

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
};
