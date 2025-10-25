"use client";

import type {ChipVariants} from "./chip.styles";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";

import {chipVariants} from "./chip.styles";

interface ChipRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "type" | "color">,
    ChipVariants {
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

export type {ChipRootProps};
export {ChipRoot};
