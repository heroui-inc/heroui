"use client";

import type {LabelVariants} from "./label.styles";
import type {LabelProps as LabelPrimitiveProps} from "react-aria-components";

import React from "react";
import {Label as LabelPrimitive} from "react-aria-components";

import {labelVariants} from "./label.styles";

interface LabelProps extends LabelPrimitiveProps, LabelVariants {
  ref?: React.Ref<HTMLLabelElement>;
}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive>, LabelProps>(
  ({children, className, disabled, required, size, variant, ...rest}, ref) => {
    return (
      <LabelPrimitive
        ref={ref}
        className={labelVariants({size, variant, required, disabled, className})}
        data-slot="label"
        {...rest}
      >
        {children}
      </LabelPrimitive>
    );
  },
);

Label.displayName = "HeroUI.Label";

export type {LabelProps};
export {Label};
