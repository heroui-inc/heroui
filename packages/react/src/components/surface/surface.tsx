"use client";

import type {SurfaceContextValue} from "./surface.constants";
import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {surfaceVariants} from "@heroui/styles";
import React, {createContext} from "react";

import {dom} from "../../utils/dom";

/* ------------------------------------------------------------------------------------------------
 * Surface Context
 * --------------------------------------------------------------------------------------------- */
const SurfaceContext = createContext<SurfaceContextValue>({});

/* ------------------------------------------------------------------------------------------------
 * Surface Root
 * --------------------------------------------------------------------------------------------- */
interface SurfaceRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Visual variant. @default "default" */
  variant?: SurfaceVariants["variant"];
}

const SurfaceRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant = "default",
  ...rest
}: SurfaceRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SurfaceRootProps<E>>) => {
  const contextValue = React.useMemo(() => ({variant}), [variant]);

  return (
    <SurfaceContext value={contextValue}>
      <dom.div
        className={surfaceVariants({variant, className})}
        data-slot="surface"
        {...(rest as any)}
      >
        {children}
      </dom.div>
    </SurfaceContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export {SurfaceRoot, SurfaceContext};

export type {SurfaceRootProps};
