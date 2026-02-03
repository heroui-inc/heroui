"use client";

import type {ChipVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {chipVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Chip Context
 * -----------------------------------------------------------------------------------------------*/
type ChipContext = {
  slots?: ReturnType<typeof chipVariants>;
};

const ChipContext = createContext<ChipContext>({});

/* -------------------------------------------------------------------------------------------------
 * Chip Root
 * -----------------------------------------------------------------------------------------------*/
interface ChipRootProps extends Omit<ComponentPropsWithRef<"div">, "type" | "color">, ChipVariants {
  className?: string;
  children: React.ReactNode;
}

const ChipRoot = ({children, className, color, size, variant, ...props}: ChipRootProps) => {
  const slots = React.useMemo(() => chipVariants({color, size, variant}), [color, size, variant]);

  return (
    <ChipContext value={{slots}}>
      <span {...props} className={composeSlotClassName(slots.base, className)} data-slot="chip">
        {children}
      </span>
    </ChipContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Chip Label
 * -----------------------------------------------------------------------------------------------*/
interface ChipLabelProps extends ComponentPropsWithRef<"span"> {
  className?: string;
}

const ChipLabel = ({children, className, ...props}: ChipLabelProps) => {
  const {slots} = useContext(ChipContext);

  return (
    <span
      className={composeSlotClassName(slots?.label, className)}
      data-slot="chip-label"
      {...props}
    >
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot, ChipLabel};

export type {ChipRootProps, ChipLabelProps};
