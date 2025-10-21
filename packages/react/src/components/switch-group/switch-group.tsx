"use client";

import type {SwitchGroupVariants} from "./switch-group.styles";

import React from "react";

import {switchGroupVariants} from "./switch-group.styles";

interface SwitchGroupProps extends React.HTMLAttributes<HTMLDivElement>, SwitchGroupVariants {}

const SwitchGroup = ({children, className, orientation, ...props}: SwitchGroupProps) => {
  const slots = React.useMemo(() => switchGroupVariants({orientation}), [orientation]);

  return (
    <div data-slot="switch-group" {...props} className={slots.base({className})}>
      {children}
    </div>
  );
};

export {SwitchGroup};
export type {SwitchGroupProps};
