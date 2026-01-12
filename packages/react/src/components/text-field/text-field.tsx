"use client";

import type {TextFieldVariants} from "./text-field.styles";
import type {ComponentPropsWithRef} from "react";

import React, {createContext} from "react";
import {TextField as TextFieldPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {textFieldVariants} from "./text-field.styles";

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

const TextFieldRoot = ({children, className, fullWidth, variant, ...props}: TextFieldRootProps) => {
  const styles = React.useMemo(() => textFieldVariants({fullWidth}), [fullWidth]);

  return (
    <TextFieldPrimitive
      data-slot="text-field"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => (
        <TextFieldContext value={{variant}}>
          <>{typeof children === "function" ? children(values) : children}</>
        </TextFieldContext>
      )}
    </TextFieldPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldRoot, TextFieldContext};

export type {TextFieldRootProps};
