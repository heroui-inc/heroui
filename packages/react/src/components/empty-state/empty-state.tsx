import type {EmptyStateVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {emptyStateVariants} from "@heroui/styles";
import React from "react";

/* -------------------------------------------------------------------------------------------------
 * EmptyState Root
 * -----------------------------------------------------------------------------------------------*/
interface EmptyStateRootProps extends ComponentPropsWithRef<"div">, EmptyStateVariants {}

const EmptyStateRoot = ({children, className, ...rest}: EmptyStateRootProps) => {
  return (
    <div className={emptyStateVariants({className})} data-slot="empty-state" {...rest}>
      {children || "No results found"}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {EmptyStateRoot};

export type {EmptyStateRootProps};
