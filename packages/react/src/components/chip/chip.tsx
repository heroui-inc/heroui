"use client";

import type {ChipVariants} from "./chip.styles";
import type {ComponentPropsWithRef} from "react";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";

import {chipVariants} from "./chip.styles";

/* -------------------------------------------------------------------------------------------------
 * Chip Root
 * -----------------------------------------------------------------------------------------------*/
interface ChipRootProps extends Omit<ComponentPropsWithRef<"div">, "type" | "color">, ChipVariants {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}

const ChipRoot = ({
  asChild = false,
  children,
  className,
  color,
  size,
  variant,
  ...props
}: ChipRootProps) => {
  const Comp = asChild ? SlotPrimitive : "span";

  return (
    <Comp {...props} className={chipVariants({className, size, color, variant})}>
      {children}
    </Comp>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot};

export type {ChipRootProps};
