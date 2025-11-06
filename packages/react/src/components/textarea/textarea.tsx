"use client";

import type {TextAreaVariants} from "./textarea.styles";
import type {TextAreaProps as TextAreaPrimitiveProps} from "react-aria-components";

import React, {useContext} from "react";
import {TextArea as TextAreaPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {SurfaceContext} from "../surface";

import {textAreaVariants} from "./textarea.styles";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps extends TextAreaPrimitiveProps, TextAreaVariants {}

const TextAreaRoot = ({className, isOnSurface, ...rest}: TextAreaRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <TextAreaPrimitive
      className={composeTwRenderProps(className, textAreaVariants({isOnSurface: isOnSurfaceValue}))}
      data-slot="textarea"
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps};
