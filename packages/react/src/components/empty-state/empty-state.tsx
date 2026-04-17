import type {DOMRenderProps} from "../../utils/dom";
import type {ReactNode} from "react";

import {emptyStateVariants} from "@heroui/styles";
import React from "react";

import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * EmptyState Root
 * -----------------------------------------------------------------------------------------------*/
interface EmptyStateRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const EmptyStateRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...rest
}: EmptyStateRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof EmptyStateRootProps<E>>) => {
  return (
    <dom.div className={emptyStateVariants({className})} data-slot="empty-state" {...(rest as any)}>
      {children || "No results found"}
    </dom.div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {EmptyStateRoot};

export type {EmptyStateRootProps};
