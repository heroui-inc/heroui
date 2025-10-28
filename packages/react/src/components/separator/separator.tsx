"use client";

import type {SeparatorVariants} from "./separator.styles.js";
import type {SeparatorProps as SeparatorPrimitiveProps} from "react-aria-components";

import {Separator as SeparatorPrimitive} from "react-aria-components";

import {separatorVariants} from "./separator.styles.js";

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
