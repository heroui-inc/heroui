"use client";

import type {TextVariants} from "./text.styles";
import type {TextProps as TextPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React from "react";
import {Text as TextPrimitive} from "react-aria-components";

import {textVariants} from "./text.styles";

interface TextProps extends TextPrimitiveProps, TextVariants {
  ref?: React.Ref<HTMLElement>;
  asChild?: boolean;
}

const Text = React.forwardRef<React.ElementRef<typeof TextPrimitive>, TextProps>(
  ({asChild = false, children, className, size, variant, ...rest}, ref) => {
    const styles = textVariants({size, variant, className});

    if (asChild) {
      return (
        <SlotPrimitive ref={ref} className={styles} {...rest}>
          {children}
        </SlotPrimitive>
      );
    }

    return (
      <TextPrimitive ref={ref} className={styles} {...rest}>
        {children}
      </TextPrimitive>
    );
  },
);

Text.displayName = "HeroUI.Text";

export type {TextProps};
export {Text};
