"use client";

import type {TextVariants} from "./text.styles";
import type {TextProps as TextPrimitiveProps} from "react-aria-components";

import React from "react";
import {Text as TextPrimitive} from "react-aria-components";

import {textVariants} from "./text.styles";

interface TextProps extends TextPrimitiveProps, TextVariants {
  ref?: React.Ref<HTMLElement>;
}

const Text = React.forwardRef<React.ElementRef<typeof TextPrimitive>, TextProps>(
  ({children, className, size, variant, ...rest}, ref) => {
    return (
      <TextPrimitive ref={ref} className={textVariants({size, variant, className})} {...rest}>
        {children}
      </TextPrimitive>
    );
  },
);

Text.displayName = "HeroUI.Text";

export type {TextProps};
export {Text};
