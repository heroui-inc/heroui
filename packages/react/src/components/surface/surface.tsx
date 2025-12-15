"use client";

import type {SurfaceVariants} from "./surface.styles";
import type {ComponentPropsWithRef} from "react";

import React, {createContext} from "react";

import {surfaceVariants} from "./surface.styles";

/* ------------------------------------------------------------------------------------------------
 * Surface Context
 * --------------------------------------------------------------------------------------------- */
type SurfaceContext = {
  variant?: SurfaceVariants["variant"];
};

const SurfaceContext = createContext<SurfaceContext>({});

/* ------------------------------------------------------------------------------------------------
 * Surface Root
 * --------------------------------------------------------------------------------------------- */
interface SurfaceRootProps extends ComponentPropsWithRef<"div">, SurfaceVariants {}

const SurfaceRoot = ({children, className, variant = "default", ...rest}: SurfaceRootProps) => {
  return (
    <SurfaceContext value={{variant}}>
      <div className={surfaceVariants({variant, className})} data-slot="surface" {...rest}>
        {children}
      </div>
    </SurfaceContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {SurfaceRoot, SurfaceContext};

export type {SurfaceRootProps};
