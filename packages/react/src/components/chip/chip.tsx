"use client";

import type {ChipVariants} from "./chip.styles";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React from "react";

import {chipVariants} from "./chip.styles";

interface ChipRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "type">, ChipVariants {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

const ChipRoot = React.forwardRef<React.ComponentRef<"span">, ChipRootProps>(
  ({asChild = false, children, className, type, variant, ...props}, ref) => {
    const Comp = asChild ? SlotPrimitive : "span";

    return (
      <Comp ref={ref} {...props} className={chipVariants({className, type, variant})}>
        {children}
      </Comp>
    );
  },
);

ChipRoot.displayName = "HeroUI.ChipRoot";

export type {ChipRootProps};
export {ChipRoot};
