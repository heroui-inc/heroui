"use client";

import type {ChipVariants} from "./chip.styles";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";

import {chipVariants} from "./chip.styles";

interface ChipRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "type">, ChipVariants {
  className?: string;
  children: React.ReactNode;
  asChild?: boolean;
}
const ChipRoot = ({
  asChild = false,
  children,
  className,
  type,
  variant,
  ...props
}: ChipRootProps) => {
  const Comp = asChild ? SlotPrimitive : "span";

  return (
    <Comp {...props} className={chipVariants({className, type, variant})}>
      {children}
    </Comp>
  );
};

export type {ChipRootProps};
export {ChipRoot};
