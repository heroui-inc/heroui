"use client";

import type {TextVariants} from "./text.styles";
import type {TextProps as TextPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {Text as TextPrimitive} from "react-aria-components";

import {textVariants} from "./text.styles";

interface TextProps extends TextPrimitiveProps, TextVariants {
  asChild?: boolean;
}
const Text = ({asChild = false, children, className, size, variant, ...rest}: TextProps) => {
  const styles = textVariants({size, variant, className});

  if (asChild) {
    return (
      <SlotPrimitive className={styles} {...rest}>
        {children}
      </SlotPrimitive>
    );
  }

  return (
    <TextPrimitive className={styles} {...rest}>
      {children}
    </TextPrimitive>
  );
};

export type {TextProps};
export {Text};
