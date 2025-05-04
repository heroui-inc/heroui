"use client";

import type {SpinnerVariants} from "./spinner.styles";

import {spinnerVariants} from "./spinner.styles";

const SpinnerPrimitive = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-slot-icon viewBox="0 0 24 24" {...props}>
    <defs>
      <linearGradient id="mingcuteLoadingLine0" x1="50%" x2="50%" y1="5.271%" y2="91.793%">
        <stop offset="0%" stopColor="currentColor" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="mingcuteLoadingLine1" x1="50%" x2="50%" y1="8.877%" y2="90.415%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
      </linearGradient>
    </defs>
    <g fill="none">
      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
      <path
        d="M8.886.006a1 1 0 0 1 .22 1.988A8.001 8.001 0 0 0 10 17.944v2c-5.523 0-10-4.476-10-10C0 4.838 3.848.566 8.886.007Z"
        fill="url(#mingcuteLoadingLine0)"
        transform="translate(2 2.055)"
      />
      <path
        d="M14.322 1.985a1 1 0 0 1 1.392-.248A9.99 9.99 0 0 1 20 9.945c0 5.523-4.477 10-10 10v-2a8 8 0 0 0 4.57-14.567a1 1 0 0 1-.248-1.393"
        fill="url(#mingcuteLoadingLine1)"
        transform="translate(2 2.055)"
      />
    </g>
  </svg>
);

interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<"svg">, "display" | "opacity" | "color">,
    SpinnerVariants {
  ref?: React.RefObject<SVGSVGElement>;
}

const Spinner = ({ref, ...props}: SpinnerProps) => {
  const {className, color, size, ...spinnerProps} = props;

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
      {...spinnerProps}
    />
  );
};

export {Spinner};
export type {SpinnerProps};
