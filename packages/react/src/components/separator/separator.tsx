"use client";

import type {SeparatorVariants} from "./separator.styles";
import type {ComponentPropsWithRef} from "react";

import React, {useContext} from "react";
import {Separator as SeparatorPrimitive} from "react-aria-components";

import {SurfaceContext} from "../surface";

import {separatorVariants} from "./separator.styles";

/* -------------------------------------------------------------------------------------------------
 * Separator Root
 * -----------------------------------------------------------------------------------------------*/
interface SeparatorRootProps
  extends ComponentPropsWithRef<typeof SeparatorPrimitive>, SeparatorVariants {}

const SeparatorRoot = ({
  className,
  inSurface,
  orientation = "horizontal",
  ...props
}: SeparatorRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  // Auto-detect surface from SurfaceContext if not explicitly provided
  // If inSurface is not provided and no SurfaceContext, tv() will use default undefined (base style)
  const resolvedInSurface = inSurface ?? surfaceContext.variant;

  return (
    <SeparatorPrimitive
      data-orientation={orientation}
      data-slot="separator"
      orientation={orientation}
      className={separatorVariants({
        orientation,
        inSurface: resolvedInSurface,
        className,
      })}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SeparatorRoot};

export type {SeparatorRootProps};
