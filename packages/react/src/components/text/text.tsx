"use client";

import type {TextVariants} from "./text.styles";
import type {ComponentPropsWithRef} from "react";

import {Text as TextPrimitive} from "react-aria-components";

import {textVariants} from "./text.styles";

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
