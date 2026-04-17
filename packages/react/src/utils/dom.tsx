"use client";

/* eslint-disable no-console */
/*
 * From https://github.com/adobe/react-spectrum/blob/0e69a1bf028448551b8e6c3ee936f41b8f70109a/packages/react-aria-components/src/utils.tsx
 * Remove it and import directly from react-aria-components when they export it.
 */

import type {AllHTMLAttributes, ForwardedRef, ReactElement} from "react";

import {mergeRefs, useLayoutEffect} from "@react-aria/utils";
import React, {forwardRef, useMemo, useRef} from "react";

export type DOMRenderFunction<E extends keyof React.JSX.IntrinsicElements, T> = (
  props: React.JSX.IntrinsicElements[E],
  renderProps: T,
) => ReactElement;
export interface DOMRenderProps<E extends keyof React.JSX.IntrinsicElements, T> {
  /**
   * Overrides the default DOM element with a custom render function.
   * This allows rendering existing components with built-in styles and behaviors
   * such as router links, animation libraries, and pre-styled components.
   *
   * Requirements:
   *
   * * You must render the expected element type (e.g. if `<button>` is expected, you cannot render an `<a>`).
   * * Only a single root DOM element can be rendered (no fragments).
   * * You must pass through props and ref to the underlying DOM element, merging with your own prop as appropriate.
   */
  render?: DOMRenderFunction<E, T>;
}

// eslint-disable-next-line react-refresh/only-export-components
function DOMElement(
  ElementType: string,
  props: DOMRenderProps<any, any> & AllHTMLAttributes<HTMLElement>,
  forwardedRef: ForwardedRef<HTMLElement>,
) {
  const {render, ...otherProps} = props;
  const elementRef = useRef<HTMLElement | null>(null);
  const ref = useMemo(() => mergeRefs(forwardedRef, elementRef), [forwardedRef, elementRef]);

  useLayoutEffect(() => {
    if (typeof process !== "undefined" && process.env?.["NODE_ENV"] !== "production" && render) {
      if (!elementRef.current) {
        console.warn(
          "Ref was not connected to DOM element returned by custom `render` function. Did you forget to pass through or merge the `ref`?",
        );
      }
    }
  }, [ElementType, render]);

  const domProps: any = {...otherProps, ref};

  if (render) {
    return render(domProps, undefined);
  }

  return <ElementType {...domProps} />;
}

type DOMComponents = {
  [E in keyof React.JSX.IntrinsicElements]: (
    props: DOMRenderProps<E, any> & React.JSX.IntrinsicElements[E],
  ) => ReactElement;
};

const domComponentCache: Record<string, unknown> = {};

// Dynamically generates and caches components for each DOM element (e.g. `dom.button`).
export const dom = new Proxy(
  {},
  {
    get(_target, elementType) {
      if (typeof elementType !== "string") {
        return undefined;
      }

      let res = domComponentCache[elementType];

      if (!res) {
        res = forwardRef(DOMElement.bind(null, elementType));
        domComponentCache[elementType] = res;
      }

      return res;
    },
  },
) as DOMComponents;
