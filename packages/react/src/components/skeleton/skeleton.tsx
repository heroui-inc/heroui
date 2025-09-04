"use client";

import type {SkeletonVariants} from "./skeleton.styles";

import React from "react";

import {skeletonVariants} from "./skeleton.styles";

/* -------------------------------------------------------------------------------------------------
 * Skeleton
 * -----------------------------------------------------------------------------------------------*/

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, SkeletonVariants {}

const Skeleton = React.forwardRef<React.ElementRef<"div">, SkeletonProps>(
  ({children, className, ...props}, ref) => {
    const slots = React.useMemo(() => skeletonVariants({}), []);

    return (
      <div ref={ref} className={slots.base({className})} {...props}>
        {children}
      </div>
    );
  },
);

Skeleton.displayName = "HeroUI.Skeleton";

export type {SkeletonProps};

export default Skeleton;
