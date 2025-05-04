"use client";

import type {PopoverVariants} from "./popover.styles";
import type {PopoverProps as PopoverPrimitiveProps} from "react-aria-components";

import React from "react";
import {
  Dialog,
  Focusable as FocusablePrimitive,
  Heading as HeadingPrimitive,
  OverlayArrow,
  Popover as PopoverPrimitive,
  DialogTrigger as PopoverTriggerPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {popoverVariants} from "./popover.styles";

type PopoverProps = React.ComponentProps<typeof PopoverTriggerPrimitive>;

/* -------------------------------------------------------------------------------------------------
 * Popover
 * -----------------------------------------------------------------------------------------------*/

interface PopoverContentProps extends Omit<PopoverPrimitiveProps, "children">, PopoverVariants {
  showArrow?: boolean;
  children: React.ReactNode;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive>,
  PopoverContentProps
>(({children, className, offset: offsetProp, showArrow = false, ...props}, ref) => {
  const offset = offsetProp ? offsetProp : showArrow ? 7 : 3;

  return (
    <PopoverPrimitive
      {...props}
      ref={ref}
      className={composeTwRenderProps(className, popoverVariants())}
      offset={offset}
    >
      <Dialog>
        {!!showArrow && (
          <OverlayArrow>
            <svg data-tooltip-arrow height={12} viewBox="0 0 12 12" width={12}>
              <path d="M0 0 L6 6 L12 0" />
            </svg>
          </OverlayArrow>
        )}
        {children}
      </Dialog>
    </PopoverPrimitive>
  );
});

PopoverContent.displayName = "HeroUI.PopoverContent";

/* -----------------------------------------------------------------------------------------------*/

const TooltipTrigger = (props: React.ComponentProps<typeof FocusablePrimitive>) => (
  <FocusablePrimitive {...props} />
);

/* -----------------------------------------------------------------------------------------------*/

const PopoverHeading = React.forwardRef<
  React.ElementRef<typeof HeadingPrimitive>,
  React.ComponentProps<typeof HeadingPrimitive>
>(({children, ...props}, ref) => {
  return (
    <HeadingPrimitive ref={ref} slot="title" {...props}>
      {children}
    </HeadingPrimitive>
  );
});

PopoverHeading.displayName = "HeroUI.PopoverHeading";

/* -----------------------------------------------------------------------------------------------*/

const Root = PopoverTriggerPrimitive;
const Trigger = TooltipTrigger;
const Content = PopoverContent;
const Heading = PopoverHeading;

export {Root, Trigger, Content, Heading};
export type {PopoverProps, PopoverContentProps};
