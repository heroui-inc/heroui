"use client";

import type {SwitchGroupVariants} from "./switch-group.styles";

import React from "react";

import {switchGroupVariants} from "./switch-group.styles";

/* -------------------------------------------------------------------------------------------------
 * Switch Group Root
 * -----------------------------------------------------------------------------------------------*/
interface SwitchGroupRootProps extends React.HTMLAttributes<HTMLDivElement>, SwitchGroupVariants {}

const SwitchGroupRoot = ({children, className, orientation, ...props}: SwitchGroupRootProps) => {
  const slots = React.useMemo(() => switchGroupVariants({orientation}), [orientation]);

  return (
    <div data-slot="switch-group" {...props} className={slots.base({className})}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SwitchGroupRoot};

export type {SwitchGroupRootProps};
