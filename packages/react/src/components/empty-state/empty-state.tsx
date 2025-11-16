import type {EmptyStateVariants} from "./empty-state.styles";
import type {HTMLAttributes} from "react";

import React from "react";

import {emptyStateVariants} from "./empty-state.styles";

/* -------------------------------------------------------------------------------------------------
 * EmptyState Root
 * -----------------------------------------------------------------------------------------------*/
interface EmptyStateRootProps extends HTMLAttributes<HTMLDivElement>, EmptyStateVariants {}

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
