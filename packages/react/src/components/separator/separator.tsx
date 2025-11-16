"use client";

import type {SeparatorVariants} from "./separator.styles";
import type {SeparatorProps as SeparatorPrimitiveProps} from "react-aria-components";

import {Separator as SeparatorPrimitive} from "react-aria-components";

import {separatorVariants} from "./separator.styles";

/* -------------------------------------------------------------------------------------------------
 * Separator Root
 * -----------------------------------------------------------------------------------------------*/
interface SeparatorRootProps extends SeparatorPrimitiveProps, SeparatorVariants {}

const SeparatorRoot = ({className, orientation = "horizontal", ...props}: SeparatorRootProps) => {
  // TODO: Handle on surface colors/variant

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
