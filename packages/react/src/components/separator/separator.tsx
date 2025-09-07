"use client";

import type {SeparatorVariants} from "./separator.styles";
import type {SeparatorProps as SeparatorPrimitiveProps} from "react-aria-components";

import React from "react";
import {Separator as SeparatorPrimitive} from "react-aria-components";

import {separatorVariants} from "./separator.styles";

interface SeparatorProps extends SeparatorPrimitiveProps, SeparatorVariants {}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({className, orientation = "horizontal", ...props}, ref) => {
    return (
      <SeparatorPrimitive
        ref={ref}
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
  },
);

Separator.displayName = "HeroUI.Separator";

export {Separator};
export type {SeparatorProps};
