"use client";

import type {ChipVariants} from "./chip.styles";

import React from "react";

import {chipVariants} from "./chip.styles";

interface ChipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, ChipVariants {
  className?: string;
  children: React.ReactNode;
}

const Chip = React.forwardRef<React.ElementRef<"span">, ChipProps>(
  ({children, className, color, variant, ...props}, ref) => {
    return (
      <span ref={ref} {...props} className={chipVariants({className, color, variant})}>
        {children}
      </span>
    );
  },
);

Chip.displayName = "HeroUI.Chip";

export type {ChipProps};
export {Chip};
