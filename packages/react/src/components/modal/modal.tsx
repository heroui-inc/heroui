"use client";

import type {ModalVariants} from "./modal.styles";
import type {UseOverlayStateProps, UseOverlayStateReturn} from "../../hooks/use-overlay-state";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {
  Button as ButtonPrimitive,
  DialogProps as DialogPrimitiveProps,
} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {mergeProps} from "@react-aria/utils";
import {createContext, useContext, useMemo} from "react";
import {
  Dialog as DialogPrimitive,
  Heading as HeadingPrimitive,
  ModalOverlay as ModalOverlayPrimitive,
  Modal as ModalPrimitive,
  DialogTrigger as ModalTriggerPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components";

import {isNotAsChild} from "../../utils";
import {composeTwRenderProps} from "../../utils/compose";
import {CloseButton} from "../close-button";
import {SurfaceContext} from "../surface";

import {modalVariants} from "./modal.styles";

type ModalPlacement = "auto" | "top" | "center" | "bottom";

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
interface ModalRootProps extends ComponentPropsWithRef<typeof ModalTriggerPrimitive> {
  state?: UseOverlayStateReturn;
}

const ModalRoot = ({children, state, ...props}: ModalRootProps) => {
  const modalContext = useMemo<ModalContext>(
    () => ({slots: modalVariants(), placement: undefined}),
    [],
  );

  const controlledProps = useMemo<UseOverlayStateProps>(
    () => (state ? {isOpen: state.isOpen, onOpenChange: state.setOpen} : {}),
    [state],
  );

  return (
    <ModalContext value={modalContext}>
      <ModalTriggerPrimitive data-slot="modal-root" {...mergeProps(props, controlledProps)}>
        {children}
      </ModalTriggerPrimitive>
    </ModalContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ModalTriggerProps extends ComponentPropsWithRef<"div"> {}

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
 * Modal Container
 * -----------------------------------------------------------------------------------------------*/
interface ModalContainerProps extends ComponentPropsWithRef<typeof ModalPrimitive> {
  placement?: ModalPlacement;
  scroll?: ModalVariants["scroll"];
  variant?: ModalVariants["variant"];
  /**
   * Whether to close the modal when the user interacts outside it.
   * @default true
   */
  isDismissable?: boolean;
  backdropClassName?: ComponentPropsWithRef<typeof ModalOverlayPrimitive>["className"];
}

const ModalContainer = ({
  backdropClassName,
  children,
  className,
  isDismissable = true,
  placement = "auto",
  scroll = "inside",
  variant = "opaque",
  ...props
}: ModalContainerProps) => {
  const {slots: contextSlots} = useContext(ModalContext);

  const updatedSlots = useMemo(() => modalVariants({scroll, variant}), [scroll, variant]);

  const updatedModalContext = useMemo<ModalContext>(
    () => ({placement, slots: {...contextSlots, ...updatedSlots}}),
    [contextSlots, placement, updatedSlots],
  );

  return (
    <ModalContext.Provider value={updatedModalContext}>
      <ModalOverlayPrimitive
        className={composeTwRenderProps(backdropClassName, updatedSlots?.backdrop())}
        data-slot="modal-backdrop"
        isDismissable={isDismissable}
        {...props}
      >
        <ModalPrimitive
          className={composeTwRenderProps(className, updatedSlots?.container())}
          data-placement={placement}
          data-slot="modal-container"
        >
          {(renderProps) => (typeof children === "function" ? children(renderProps) : children)}
        </ModalPrimitive>
      </ModalOverlayPrimitive>
    </ModalContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Dialog
 * -----------------------------------------------------------------------------------------------*/
interface ModalDialogProps extends DialogPrimitiveProps {}

const ModalDialog = ({children, className, ...props}: ModalDialogProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <SurfaceContext.Provider
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <DialogPrimitive className={slots?.dialog({className})} data-slot="modal-dialog" {...props}>
        {children}
      </DialogPrimitive>
    </SurfaceContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Header
 * -----------------------------------------------------------------------------------------------*/
interface ModalHeaderProps extends ComponentPropsWithRef<"div"> {}

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
interface ModalBodyProps extends ComponentPropsWithRef<"div"> {}

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
interface ModalFooterProps extends ComponentPropsWithRef<"div"> {}

const ModalFooter = ({children, className, ...props}: ModalFooterProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <div className={slots?.footer({className})} data-slot="modal-footer" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Modal Heading
 * -----------------------------------------------------------------------------------------------*/
interface ModalHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const ModalHeading = ({children, className, ...props}: ModalHeadingProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <HeadingPrimitive
      className={slots?.heading({className})}
      data-slot="modal-heading"
      slot="title"
      {...props}
    >
      {children}
    </HeadingPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Icon
 * -----------------------------------------------------------------------------------------------*/
interface ModalIconProps extends ComponentPropsWithRef<"div"> {}

const ModalIcon = ({children, className, ...props}: ModalIconProps) => {
  const {slots} = useContext(ModalContext);

  return (
    <div className={slots?.icon({className})} data-slot="modal-icon" {...props}>
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
  (props: {asChild: true} & ComponentPropsWithRef<"button">): React.JSX.Element;
  (props: {asChild?: false} & ComponentPropsWithRef<typeof ButtonPrimitive>): React.JSX.Element;
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
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalIcon,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalCloseTrigger,
};

export type {
  ModalRootProps,
  ModalTriggerProps,
  ModalContainerProps,
  ModalDialogProps,
  ModalHeaderProps,
  ModalIconProps,
  ModalHeadingProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseTriggerProps,
};
