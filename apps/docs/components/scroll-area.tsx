"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import {cn} from "@heroui/react";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    scrollViewPortRef?: React.RefObject<HTMLDivElement>;
  }
>(({className, children, ...props}, ref) => {
  const {onScroll, scrollViewPortRef, ...restProps} = props;

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...restProps}
    >
      <ScrollAreaPrimitive.Viewport
        ref={scrollViewPortRef}
        className="h-full w-full rounded-[inherit] pb-28"
        onScroll={onScroll}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({className, orientation = "vertical", ...props}, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-[1px]",
      className,
    )}
    orientation={orientation}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative rounded-full bg-default-400/50",
        orientation === "vertical" && "flex-1",
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export {ScrollArea, ScrollBar};
