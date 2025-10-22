"use client";

import type {ModalVariants} from "./modal.styles";
import type {UseModalStateReturn} from "./use-modal";
import type {ComponentProps, ComponentRef, HTMLAttributes, ReactNode} from "react";
import type {ButtonProps, DialogProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {createContext, forwardRef, useContext, useMemo} from "react";
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

const ModalContext = createContext<{
  slots?: ReturnType<typeof modalVariants>;
  placement?: ModalPlacement;
}>({});

interface ModalProps extends ComponentProps<typeof ModalTriggerPrimitive> {
  state?: UseModalStateReturn;
}

const ModalRoot = ({children, state, ...props}: ModalProps) => {
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
    <ModalContext.Provider value={contextValue}>
      <ModalTriggerPrimitive data-slot="modal-root" {...controlledProps} {...props}>
        {children}
      </ModalTriggerPrimitive>
    </ModalContext.Provider>
  );
};

ModalRoot.displayName = "HeroUI.Modal";

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

ModalTrigger.displayName = "HeroUI.Modal.Trigger";

interface ModalOverlayProps extends ComponentProps<typeof ModalOverlayPrimitive> {
  variant?: ModalVariants["variant"];
}

const ModalOverlay = forwardRef<ComponentRef<typeof ModalOverlayPrimitive>, ModalOverlayProps>(
  ({children, className, variant = "solid", ...props}, ref) => {
    const {slots: parentSlots} = useContext(ModalContext);

    const slots = useMemo(() => {
      return modalVariants({variant});
    }, [variant]);

    const contextValue = useMemo(
      () => ({slots: {...parentSlots, ...slots}, placement: undefined}),
      [parentSlots, slots],
    );

    return (
      <ModalContext.Provider value={contextValue}>
        <ModalOverlayPrimitive
          ref={ref}
          className={composeTwRenderProps(className, slots?.overlay())}
          data-slot="modal-overlay"
          {...props}
        >
          {children}
        </ModalOverlayPrimitive>
      </ModalContext.Provider>
    );
  },
);

ModalOverlay.displayName = "HeroUI.Modal.Overlay";

interface ModalContainerProps extends ComponentProps<typeof ModalPrimitive> {
  placement?: ModalPlacement;
  scroll?: ModalVariants["scroll"];
}

const ModalContainer = forwardRef<ComponentRef<typeof ModalPrimitive>, ModalContainerProps>(
  ({children, className, placement = "auto", scroll = "inside", ...props}, ref) => {
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
          ref={ref}
          className={composeTwRenderProps(className, slots?.container())}
          data-placement={placement}
          data-slot="modal-container"
        >
          {children}
        </ModalPrimitive>
      </ModalContext.Provider>
    );
  },
);

ModalContainer.displayName = "HeroUI.Modal.Container";

interface ModalDialogProps extends Omit<DialogProps, "children"> {
  children: ReactNode | ((opts: {close: () => void}) => ReactNode);
}

const ModalDialog = forwardRef<HTMLElement, ModalDialogProps>(
  ({children, className, ...props}, ref) => {
    const {placement, slots} = useContext(ModalContext);

    return (
      <DialogPrimitive
        ref={ref}
        className={slots?.dialog({className})}
        data-placement={placement}
        data-slot="modal-dialog"
        {...props}
      >
        {children}
      </DialogPrimitive>
    );
  },
);

ModalDialog.displayName = "HeroUI.Modal.Dialog";

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <div ref={ref} className={slots?.header({className})} data-slot="modal-header" {...props}>
        {children}
      </div>
    );
  },
);

ModalHeader.displayName = "HeroUI.Modal.Header";

const ModalBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <div ref={ref} className={slots?.body({className})} data-slot="modal-body" {...props}>
        {children}
      </div>
    );
  },
);

ModalBody.displayName = "HeroUI.Modal.Body";

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(ModalContext);

    return (
      <div ref={ref} className={slots?.footer({className})} data-slot="modal-footer" {...props}>
        {children}
      </div>
    );
  },
);

ModalFooter.displayName = "HeroUI.Modal.Footer";

interface ModalCloseTrigger {
  (props: {asChild: true} & ComponentProps<"button">): React.JSX.Element;
  (props: {asChild?: false} & ButtonProps): React.JSX.Element;
  displayName: string;
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

ModalCloseTrigger.displayName = "HeroUI.Modal.CloseTrigger";

// interface ModalCloseTriggerProps extends ButtonPrimitiveProps {
//   ref?: Ref<HTMLButtonElement>;
//   asChild?: boolean;
// }

// const ModalCloseTrigger = forwardRef<HTMLButtonElement, ModalCloseTriggerProps>(
//   ({asChild, children, className, ...rest}, ref) => {
//     const {slots} = useContext(ModalContext);

//     if (asChild) {
//       return (
//         <SlotPrimitive
//           ref={ref}
//           className={composeTwRenderProps(className)}
//           data-slot="modal-close-trigger"
//           slot="close"
//           {...rest}
//         >
//           {typeof children === "function" ? children({} as any) : children}
//         </SlotPrimitive>
//       );
//     }

//     return (
//       <CloseButton
//         ref={ref}
//         className={composeTwRenderProps(className, slots?.closeTrigger())}
//         data-slot="modal-close-trigger"
//         slot="close"
//         {...rest}
//       >
//         {children}
//       </CloseButton>
//     );
//   },
// );

// ModalCloseTrigger.displayName = "HeroUI.Modal.CloseTrigger";

const CompoundModal = Object.assign(ModalRoot, {
  Body: ModalBody,
  CloseTrigger: ModalCloseTrigger,
  Container: ModalContainer,
  Dialog: ModalDialog,
  Footer: ModalFooter,
  Header: ModalHeader,
  Overlay: ModalOverlay,
  Trigger: ModalTrigger,
});

export type {
  ModalProps,
  ModalOverlayProps,
  ModalContainerProps,
  ModalDialogProps,
  ModalHeaderProps,
  ModalFooterProps,
};

export default CompoundModal;
