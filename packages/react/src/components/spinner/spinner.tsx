"use client";

import type {SpinnerVariants} from "./spinner.styles";

import React from "react";

import {spinnerVariants} from "./spinner.styles";

const SpinnerPrimitive = React.forwardRef<React.ElementRef<"svg">, React.SVGProps<SVGSVGElement>>(
  ({...props}, ref) => (
    <svg ref={ref} data-slot-icon viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id="mingcuteLoadingFill0" x1="50%" x2="50%" y1="5.271%" y2="91.793%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
        </linearGradient>
        <linearGradient id="mingcuteLoadingFill1" x1="50%" x2="50%" y1="15.24%" y2="87.15%">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
        </linearGradient>
      </defs>
      <g fill="none">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <path
          d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
          fill="url(#mingcuteLoadingFill0)"
          transform="translate(1.5 1.625)"
        />
        <path
          d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
          fill="url(#mingcuteLoadingFill1)"
          transform="translate(1.5 1.625)"
        />
      </g>
    </svg>
  ),
);

SpinnerPrimitive.displayName = "HeroUI.SpinnerPrimitive";

interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<"svg">, "display" | "opacity" | "color">,
    SpinnerVariants {}

const Spinner = React.forwardRef<React.ElementRef<typeof SpinnerPrimitive>, SpinnerProps>(
  ({className, color, size, ...props}, ref) => {
    return (
      <SpinnerPrimitive
        ref={ref}
        aria-hidden
        aria-label="Loading"
        role="presentation"
        className={spinnerVariants({
          className,
          color,
          size,
        })}
        {...props}
      />
    );
  },
);

Spinner.displayName = "HeroUI.Spinner";

export {Spinner};
export type {SpinnerProps};
