"use client";

import type {SeparatorVariants} from "./separator.styles";
import type {ComponentPropsWithRef} from "react";

import React from "react";
import {Separator as SeparatorPrimitive} from "react-aria-components";

import {separatorVariants} from "./separator.styles";

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
