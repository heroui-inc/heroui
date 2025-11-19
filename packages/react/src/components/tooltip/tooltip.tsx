"use client";

import type {TooltipVariants} from "./tooltip.styles";
import type {TooltipProps as TooltipPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {
  Focusable as FocusablePrimitive,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {tooltipVariants} from "./tooltip.styles";

/* -------------------------------------------------------------------------------------------------
 * Tooltip Context
 * -----------------------------------------------------------------------------------------------*/
type TooltipContext = {
  slots?: ReturnType<typeof tooltipVariants>;
  forceHide?: boolean;
};

const TooltipContext = createContext<TooltipContext>({});

/* -------------------------------------------------------------------------------------------------
 * Tooltip Root
 * -----------------------------------------------------------------------------------------------*/
type TooltipRootProps = React.ComponentProps<typeof TooltipTriggerPrimitive>;

const TooltipRoot = ({
  children,
  closeDelay = 0,
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive>) => {
  const slots = React.useMemo(() => tooltipVariants(), []);
  const [forceHide, setForceHide] = React.useState(false);
  const [internalIsOpen, setInternalIsOpen] = React.useState(false);
  const clearTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Prevent tooltip from immediately reopening after close.
  // Fixes issue where tooltips stay visible when clicking triggers that open overlays.
  // See: https://github.com/heroui-inc/heroui/issues/5912
  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) {
        if (forceHide) {
          // Block reopening while in force-hide mode
          setInternalIsOpen(false);

          return;
        }
        setInternalIsOpen(true);
        setForceHide(false);
      } else {
        // Enter force-hide mode to prevent immediate reopening
        setInternalIsOpen(false);
        setForceHide(true);

        // Clear force-hide after 500ms to restore normal tooltip behavior.
        // This delay is long enough to prevent the race condition but short
        // enough to not impact user experience on subsequent hovers.
        if (clearTimeoutRef.current) {
          clearTimeout(clearTimeoutRef.current);
        }
        clearTimeoutRef.current = setTimeout(() => {
          setForceHide(false);
        }, 500);
      }
    },
    [forceHide],
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }
    };
  }, []);

  const contextValue = React.useMemo(
    () => ({
      slots,
      forceHide,
    }),
    [slots, forceHide],
  );

  return (
    <TooltipContext value={contextValue}>
      <TooltipTriggerPrimitive
        closeDelay={closeDelay}
        data-slot="tooltip-root"
        isOpen={internalIsOpen}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {children}
      </TooltipTriggerPrimitive>
    </TooltipContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Content
 * -----------------------------------------------------------------------------------------------*/
interface TooltipContentProps extends Omit<TooltipPrimitiveProps, "children">, TooltipVariants {
  showArrow?: boolean;
  children: React.ReactNode;
}

const TooltipContent = ({
  children,
  className,
  offset: offsetProp,
  showArrow = false,
  ...props
}: TooltipContentProps) => {
  const {forceHide, slots} = useContext(TooltipContext);
  const offset = offsetProp ? offsetProp : showArrow ? 7 : 3;

  // Don't render tooltip if it's been force-hidden (e.g., after clicking a button)
  // This prevents tooltip from staying visible when opening popovers/dialogs
  if (forceHide) {
    return null;
  }

  return (
    <TooltipPrimitive
      {...props}
      className={composeTwRenderProps(className, slots?.base())}
      offset={offset}
    >
      {children}
    </TooltipPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Arrow
 * -----------------------------------------------------------------------------------------------*/
type TooltipArrowProps = Omit<React.ComponentProps<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
};

const TooltipArrow = ({children, className, ...props}: TooltipArrowProps) => {
  const defaultArrow = (
    <svg data-slot="overlay-arrow" height={12} viewBox="0 0 12 12" width={12}>
      <path d="M0 0 Q6 9 12 0" />
    </svg>
  );

  const arrow = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{
          className?: string;
          "data-slot"?: "overlay-arrow";
        }>,
        {
          "data-slot": "overlay-arrow",
        },
      )
    : defaultArrow;

  return (
    <OverlayArrow data-slot="tooltip-arrow" {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Tooltip Trigger
 * -----------------------------------------------------------------------------------------------*/
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const TooltipTrigger = ({asChild = false, children, className, ...props}: TooltipTriggerProps) => {
  const {slots} = useContext(TooltipContext);
  const Comp = asChild ? SlotPrimitive : "div";

  return (
    <FocusablePrimitive>
      <Comp
        className={slots?.trigger({className})}
        data-slot="tooltip-trigger"
        role="button"
        {...props}
      >
        {children}
      </Comp>
    </FocusablePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow};

export type {TooltipRootProps, TooltipArrowProps, TooltipContentProps, TooltipTriggerProps};
