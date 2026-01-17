"use client";

import type {SeparatorVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {separatorVariants} from "@heroui/styles";
import React from "react";
import {Separator as SeparatorPrimitive} from "react-aria-components";

/* -------------------------------------------------------------------------------------------------
 * Separator Root
 * -----------------------------------------------------------------------------------------------*/
interface SeparatorRootProps
  extends ComponentPropsWithRef<typeof SeparatorPrimitive>, SeparatorVariants {}

const SeparatorRoot = ({className, orientation = "horizontal", ...props}: SeparatorRootProps) => {
  return (
    <SeparatorPrimitive
      data-orientation={orientation}
      data-slot="separator"
      orientation={orientation}
      className={separatorVariants({
        orientation,
        className,
      })}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SeparatorRoot};

export type {SeparatorRootProps};
