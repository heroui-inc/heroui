"use client";

import type {ChipVariants} from "./chip.styles";

import {chipVariants} from "./chip.styles";

interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, ChipVariants {
  className?: string;
  children: React.ReactNode;
}

const Chip = ({children, className, color, ...props}: ChipProps) => {
  return (
    <span {...props} className={chipVariants({className, color})}>
      {children}
    </span>
  );
};

export {Chip};
export type {ChipProps};
