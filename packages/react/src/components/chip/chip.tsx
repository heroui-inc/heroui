"use client";

import type {ChipVariants} from "./chip.styles";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React from "react";

import {chipVariants} from "./chip.styles";

interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "type">, ChipVariants {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

const Chip = React.forwardRef<React.ElementRef<"span">, ChipProps>(
  ({asChild = false, children, className, type, variant, ...props}, ref) => {
    const Comp = asChild ? SlotPrimitive : "span";

    return (
      <Comp ref={ref} {...props} className={chipVariants({className, type, variant})}>
        {children}
      </Comp>
    );
  },
);

Chip.displayName = "HeroUI.Chip";

export type {ChipProps};
export {Chip};
