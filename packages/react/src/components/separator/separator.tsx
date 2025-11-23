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
  extends ComponentPropsWithRef<typeof SeparatorPrimitive>,
    SeparatorVariants {}

const SeparatorRoot = ({
  className,
  isOnSurface,
  orientation = "horizontal",
  ...props
}: SeparatorRootProps) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);

  return (
    <SeparatorPrimitive
      data-orientation={orientation}
      data-slot="separator"
      orientation={orientation}
      className={separatorVariants({
        orientation,
        isOnSurface: isOnSurfaceValue,
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
