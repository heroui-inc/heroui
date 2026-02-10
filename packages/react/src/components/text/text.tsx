"use client";

import type {TextVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {textVariants} from "@heroui/styles";
import {Text as TextPrimitive} from "react-aria-components";

/* -------------------------------------------------------------------------------------------------
 * Text Root
 * -----------------------------------------------------------------------------------------------*/
interface TextRootProps extends ComponentPropsWithRef<typeof TextPrimitive>, TextVariants {}

const TextRoot = ({children, className, size, variant, ...rest}: TextRootProps) => {
  const styles = textVariants({size, variant, className});

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
