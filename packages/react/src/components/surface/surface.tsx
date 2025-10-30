"use client";

import type {SurfaceVariants} from "./surface.styles";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
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
interface SurfaceRootProps extends React.ComponentProps<"div">, SurfaceVariants {
  asChild?: boolean;
}

const SurfaceRoot = ({
  asChild,
  children,
  className,
  variant = "default",
  ...rest
}: SurfaceRootProps) => {
  const Component = asChild ? SlotPrimitive : "div";

  return (
    <SurfaceContext value={{variant}}>
      <Component className={surfaceVariants({variant, className})} data-slot="surface" {...rest}>
        {children}
      </Component>
    </SurfaceContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {SurfaceRoot, SurfaceContext};

export type {SurfaceRootProps};
