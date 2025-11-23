"use client";

import type {TextVariants} from "./text.styles";
import type {ComponentPropsWithRef} from "react";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import {Text as TextPrimitive} from "react-aria-components";

import {textVariants} from "./text.styles";

/* -------------------------------------------------------------------------------------------------
 * Text Root
 * -----------------------------------------------------------------------------------------------*/
interface TextRootProps extends ComponentPropsWithRef<typeof TextPrimitive>, TextVariants {
  asChild?: boolean;
}

const TextRoot = ({
  asChild = false,
  children,
  className,
  size,
  variant,
  ...rest
}: TextRootProps) => {
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

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextRoot};

export type {TextRootProps};
