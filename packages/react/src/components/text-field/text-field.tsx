"use client";

import type {TextFieldVariants} from "./text-field.styles";
import type {ComponentPropsWithRef} from "react";

import React from "react";
import {TextField as TextFieldPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {textFieldVariants} from "./text-field.styles";

/* -------------------------------------------------------------------------------------------------
 * TextField Root
 * -----------------------------------------------------------------------------------------------*/
interface TextFieldRootProps
  extends ComponentPropsWithRef<typeof TextFieldPrimitive>,
    TextFieldVariants {}

const TextFieldRoot = ({children, className, ...props}: TextFieldRootProps) => {
  const styles = React.useMemo(() => textFieldVariants({}), []);

  return (
    <TextFieldPrimitive
      data-slot="text-field"
      {...props}
      className={composeTwRenderProps(className, styles)}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </TextFieldPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldRoot};

export type {TextFieldRootProps};
