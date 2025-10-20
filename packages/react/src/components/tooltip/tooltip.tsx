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

type TooltipProps = React.ComponentProps<typeof TooltipTriggerPrimitive>;

const TooltipContext = createContext<{
  slots?: ReturnType<typeof tooltipVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Tooltip
 * -----------------------------------------------------------------------------------------------*/

const Tooltip = ({children, ...props}: React.ComponentProps<typeof TooltipTriggerPrimitive>) => {
  const slots = React.useMemo(() => tooltipVariants(), []);

  return (
    <TooltipContext value={{slots}}>
      <TooltipTriggerPrimitive data-slot="tooltip-root" {...props}>
        {children}
      </TooltipTriggerPrimitive>
    </TooltipContext>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface TooltipContentProps extends Omit<TooltipPrimitiveProps, "children">, TooltipVariants {
  showArrow?: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const TooltipContent = ({
  children,
  className,
  offset: offsetProp,
  ref,
  showArrow = false,
  ...props
}: TooltipContentProps) => {
  const {slots} = useContext(TooltipContext);
  const offset = offsetProp ? offsetProp : showArrow ? 7 : 3;

  return (
    <TooltipPrimitive
      {...props}
      ref={ref}
      className={composeTwRenderProps(className, slots?.base())}
      offset={offset}
    >
      {children}
    </TooltipPrimitive>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const TooltipArrow = ({
  children,
  className,
  ref,
  ...props
}: Omit<React.ComponentProps<typeof OverlayArrow>, "children"> & {
  children?: React.ReactNode;
  ref?: React.Ref<React.ComponentRef<typeof OverlayArrow>>;
}) => {
  const defaultArrow = (
    <svg data-slot="overlay-arrow" height={12} viewBox="0 0 12 12" width={12}>
      <path d="M0 0 L6 6 L12 0" />
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
    <OverlayArrow ref={ref} data-slot="tooltip-arrow" {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  ref?: React.Ref<HTMLDivElement>;
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

/* -----------------------------------------------------------------------------------------------*/

export {Tooltip, TooltipTrigger, TooltipContent, TooltipArrow};

export type {TooltipProps, TooltipContentProps, TooltipTriggerProps};
