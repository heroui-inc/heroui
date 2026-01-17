"use client";

import type {ChipVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {chipVariants} from "@heroui/styles";

/* -------------------------------------------------------------------------------------------------
 * Chip Root
 * -----------------------------------------------------------------------------------------------*/
interface ChipRootProps extends Omit<ComponentPropsWithRef<"div">, "type" | "color">, ChipVariants {
  className?: string;
  children: React.ReactNode;
}

const ChipRoot = ({children, className, color, size, variant, ...props}: ChipRootProps) => {
  return (
    <span {...props} className={chipVariants({className, size, color, variant})}>
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot};

export type {ChipRootProps};
