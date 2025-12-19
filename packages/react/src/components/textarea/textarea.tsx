"use client";

import type {TextAreaVariants} from "./textarea.styles";
import type {ComponentPropsWithRef} from "react";

import React, {useContext} from "react";
import {TextArea as TextAreaPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {SurfaceContext} from "../surface";

import {textAreaVariants} from "./textarea.styles";

/* -------------------------------------------------------------------------------------------------
 * TextArea Root
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps
  extends ComponentPropsWithRef<typeof TextAreaPrimitive>, TextAreaVariants {}

const TextAreaRoot = ({className, fullWidth, isOnSurface, ...rest}: TextAreaRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <TextAreaPrimitive
      data-slot="textarea"
      className={composeTwRenderProps(
        className,
        textAreaVariants({fullWidth, isOnSurface: isOnSurfaceValue}),
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
