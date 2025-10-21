"use client";

import type {SeparatorVariants} from "./separator.styles";
import type {SeparatorProps as SeparatorPrimitiveProps} from "react-aria-components";

import {Separator as SeparatorPrimitive} from "react-aria-components";

import {separatorVariants} from "./separator.styles";

interface SeparatorProps extends SeparatorPrimitiveProps, SeparatorVariants {}

const Separator = ({className, orientation = "horizontal", ...props}: SeparatorProps) => {
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

export {Separator};
export type {SeparatorProps};
