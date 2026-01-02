"use client";

import type {TextAreaVariants} from "./textarea.styles";
import type {ComponentPropsWithRef} from "react";

import React, {useContext} from "react";
import {TextArea as TextAreaPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {SurfaceContext} from "../surface";
import {TextFieldContext} from "../text-field";

import {textAreaVariants} from "./textarea.styles";

/* -------------------------------------------------------------------------------------------------
 * TextArea Root
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps
  extends ComponentPropsWithRef<typeof TextAreaPrimitive>, TextAreaVariants {}

const TextAreaRoot = ({className, fullWidth, inSurface, ...rest}: TextAreaRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const textFieldContext = useContext(TextFieldContext);
  const resolvedInSurface = inSurface ?? textFieldContext?.inSurface ?? surfaceContext.variant;

  return (
    <TextAreaPrimitive
      data-slot="textarea"
      className={composeTwRenderProps(
        className,
        textAreaVariants({fullWidth, inSurface: resolvedInSurface}),
      )}
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps};
