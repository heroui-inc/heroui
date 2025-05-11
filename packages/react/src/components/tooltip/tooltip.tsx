"use client";

import type {TooltipVariants} from "./tooltip.styles";
import type {TooltipProps as TooltipPrimitiveProps} from "react-aria-components";

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

const TooltipRoot = ({
  children,
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive>) => {
  const slots = React.useMemo(() => tooltipVariants(), []);

  return (
    <TooltipContext.Provider value={{slots}}>
      <TooltipTriggerPrimitive data-tooltip-root {...props}>
        {children}
      </TooltipTriggerPrimitive>
    </TooltipContext.Provider>
  );
};

TooltipRoot.displayName = "HeroUI.TooltipRoot";

/* -----------------------------------------------------------------------------------------------*/

interface TooltipContentProps extends Omit<TooltipPrimitiveProps, "children">, TooltipVariants {
  showArrow?: boolean;
  children: React.ReactNode;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive>,
  TooltipContentProps
>(({children, className, offset: offsetProp, showArrow = false, ...props}, ref) => {
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
});

TooltipContent.displayName = "HeroUI.TooltipContent";

/* -----------------------------------------------------------------------------------------------*/

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof OverlayArrow>,
  Omit<React.ComponentProps<typeof OverlayArrow>, "children"> & {children?: React.ReactNode}
>(({children, className, ...props}, ref) => {
  const defaultArrow = (
    <svg data-overlay-arrow height={12} viewBox="0 0 12 12" width={12}>
      <path d="M0 0 L6 6 L12 0" />
    </svg>
  );

  const arrow = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<{className?: string; "data-overlay-arrow"?: boolean}>,
        {
          "data-overlay-arrow": true,
        },
      )
    : defaultArrow;

  return (
    <OverlayArrow ref={ref} data-tooltip-arrow {...props} className={className}>
      {arrow}
    </OverlayArrow>
  );
});

TooltipArrow.displayName = "HeroUI.TooltipArrow";

/* -----------------------------------------------------------------------------------------------*/

const TooltipTrigger = ({children, className, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  const {slots} = useContext(TooltipContext);

  return (
    <FocusablePrimitive>
      <div data-tooltip-trigger className={slots?.trigger({className})} role="button" {...props}>
        {children}
      </div>
    </FocusablePrimitive>
  );
};

TooltipTrigger.displayName = "HeroUI.TooltipTrigger";

/* -----------------------------------------------------------------------------------------------*/

const Root = TooltipRoot;
const Trigger = TooltipTrigger;
const Content = TooltipContent;
const Arrow = TooltipArrow;

export {Root, Trigger, Content, Arrow};
export type {TooltipProps, TooltipContentProps};
