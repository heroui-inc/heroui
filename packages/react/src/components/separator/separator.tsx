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
  orientation = "horizontal",
  variant,
  ...props
}: SeparatorRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  // Auto-detect variant from SurfaceContext if not explicitly provided
  // If variant is not provided and no SurfaceContext, tv() will use default "default"
  const resolvedVariant = variant ?? surfaceContext.variant;

  return (
    <SeparatorPrimitive
      data-orientation={orientation}
      data-slot="separator"
      orientation={orientation}
      className={separatorVariants({
        orientation,
        variant: resolvedVariant,
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
