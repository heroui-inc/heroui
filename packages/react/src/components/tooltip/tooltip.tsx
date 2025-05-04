"use client";

import type {TooltipVariants} from "./tooltip.styles";
import type {TooltipProps as TooltipPrimitiveProps} from "react-aria-components";

import React from "react";
import {
  Focusable as FocusablePrimitive,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {tooltipVariants} from "./tooltip.styles";

type TooltipProps = React.ComponentProps<typeof TooltipTriggerPrimitive>;

/* -------------------------------------------------------------------------------------------------
 * Tooltip
 * -----------------------------------------------------------------------------------------------*/

interface TooltipContentProps extends Omit<TooltipPrimitiveProps, "children">, TooltipVariants {
  showArrow?: boolean;
  children: React.ReactNode;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive>,
  TooltipContentProps
>(({children, className, offset: offsetProp, showArrow = false, ...props}, ref) => {
  const offset = offsetProp ? offsetProp : showArrow ? 7 : 3;

  return (
    <TooltipPrimitive
      {...props}
      ref={ref}
      className={composeTwRenderProps(className, tooltipVariants())}
      offset={offset}
    >
      {!!showArrow && (
        <OverlayArrow>
          <svg data-tooltip-arrow height={12} viewBox="0 0 12 12" width={12}>
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </TooltipPrimitive>
  );
});

TooltipContent.displayName = "HeroUI.TooltipContent";

/* -----------------------------------------------------------------------------------------------*/

const TooltipTrigger = (props: React.ComponentProps<typeof FocusablePrimitive>) => (
  <FocusablePrimitive {...props} />
);

/* -----------------------------------------------------------------------------------------------*/

const Root = TooltipTriggerPrimitive;
const Trigger = TooltipTrigger;
const Content = TooltipContent;

export {Root, Trigger, Content};
export type {TooltipProps, TooltipContentProps};
