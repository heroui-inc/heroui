"use client";

import type {PopoverVariants} from "./popover.styles";
import type {PopoverProps as PopoverPrimitiveProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  Dialog,
  Heading as HeadingPrimitive,
  OverlayArrow,
  Popover as PopoverPrimitive,
  DialogTrigger as PopoverTriggerPrimitive,
  Pressable as PressablePrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {popoverVariants} from "./popover.styles";

type PopoverProps = React.ComponentProps<typeof PopoverTriggerPrimitive>;

const PopoverContext = createContext<{slots?: ReturnType<typeof popoverVariants>}>({});

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
  const slots = React.useMemo(() => popoverVariants(), []);

  return (
    <PopoverContext.Provider value={{slots}}>
      <PopoverPrimitive
        {...props}
        ref={ref}
        className={composeTwRenderProps(className, slots.base())}
        offset={offset}
      >
        <Dialog className={slots.dialog()}>
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
    </PopoverContext.Provider>
  );
});

PopoverContent.displayName = "HeroUI.PopoverContent";

/* -----------------------------------------------------------------------------------------------*/

const TooltipTrigger = (props: React.ComponentProps<typeof PressablePrimitive>) => (
  <PressablePrimitive {...props} />
);

/* -----------------------------------------------------------------------------------------------*/

const PopoverHeading = React.forwardRef<
  React.ElementRef<typeof HeadingPrimitive>,
  React.ComponentProps<typeof HeadingPrimitive>
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(PopoverContext);

  return (
    <HeadingPrimitive ref={ref} slot="title" {...props} className={slots?.heading({className})}>
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
