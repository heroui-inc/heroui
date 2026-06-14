"use client";

import type {TextFieldVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {textFieldVariants} from "@heroui/styles";
import React, {createContext, memo} from "react";
import {TextField as TextFieldPrimitive} from "react-aria-components/TextField";

import {composeTwRenderProps} from "../../utils/compose";

/* ------------------------------------------------------------------------------------------------
 * TextField Context
 * --------------------------------------------------------------------------------------------- */
type TextFieldContext = {
  variant?: "primary" | "secondary";
};

const TextFieldContext = createContext<TextFieldContext>({});

/* -------------------------------------------------------------------------------------------------
 * TextField Root
 * -----------------------------------------------------------------------------------------------*/
interface TextFieldRootProps
  extends ComponentPropsWithRef<typeof TextFieldPrimitive>, TextFieldVariants {
  /**
   * The variant of the text field.
   * @default "primary"
   */
  variant?: "primary" | "secondary";
}

const TextFieldRoot = memo(function TextFieldRoot({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: TextFieldRootProps) {
  const styles = React.useMemo(() => textFieldVariants({fullWidth}), [fullWidth]);
  const contextValue = React.useMemo(() => ({variant}), [variant]);

  return (
    <TextFieldContext value={contextValue}>
      <TextFieldPrimitive
        data-slot="textfield"
        {...props}
        className={composeTwRenderProps(className, styles)}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </TextFieldPrimitive>
    </TextFieldContext>
  );
});

TextFieldRoot.displayName = "HeroUI.TextField";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldRoot, TextFieldContext};

export type {TextFieldRootProps};
