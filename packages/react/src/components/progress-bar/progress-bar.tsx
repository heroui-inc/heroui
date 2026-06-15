"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ProgressBarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ProgressBarRenderProps} from "react-aria-components/ProgressBar";

import {progressBarVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {ProgressBar as ProgressBarPrimitive} from "react-aria-components/ProgressBar";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Context
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarContext {
  fillClassName?: string;
  outputClassName?: string;
  state?: ProgressBarRenderProps;
  trackClassName?: string;
}

const ProgressBarContext = createContext<ProgressBarContext>({});

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Root
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarRootProps
  extends ComponentPropsWithRef<typeof ProgressBarPrimitive>, ProgressBarVariants {}

const ProgressBarRoot = memo(function ProgressBarRoot({
  children,
  className,
  color,
  size,
  ...props
}: ProgressBarRootProps) {
  const slots = useMemo(() => progressBarVariants({color, size}), [color, size]);
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName),
    [className, baseClassName],
  );
  const slotClassNames = useMemo(
    () => ({
      fillClassName: slots.fill(),
      outputClassName: slots.output(),
      trackClassName: slots.track(),
    }),
    [slots],
  );

  return (
    <ProgressBarPrimitive data-slot="progress-bar" {...props} className={resolvedClassName}>
      {(values) => (
        <ProgressBarContext value={{...slotClassNames, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ProgressBarContext>
      )}
    </ProgressBarPrimitive>
  );
});

ProgressBarRoot.displayName = "HeroUI.ProgressBar";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Output
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarOutputProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ProgressBarOutputInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: ProgressBarOutputProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarOutputProps<E>>) {
  const {outputClassName, state} = useContext(ProgressBarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, outputClassName) as string,
    [className, outputClassName],
  );

  return (
    <dom.span className={resolvedClassName} data-slot="progress-bar-output" {...(props as any)}>
      {children ?? state?.valueText}
    </dom.span>
  );
}

ProgressBarOutputInner.displayName = "HeroUI.ProgressBar.Output";

const ProgressBarOutput = memo(ProgressBarOutputInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: ProgressBarOutputProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarOutputProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Track
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarTrackProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ProgressBarTrackInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: ProgressBarTrackProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarTrackProps<E>>) {
  const {trackClassName} = useContext(ProgressBarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, trackClassName) as string,
    [className, trackClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="progress-bar-track" {...(props as any)}>
      {children}
    </dom.div>
  );
}

ProgressBarTrackInner.displayName = "HeroUI.ProgressBar.Track";

const ProgressBarTrack = memo(ProgressBarTrackInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: ProgressBarTrackProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarTrackProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Fill
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarFillProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function ProgressBarFillInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  style,
  ...props
}: ProgressBarFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarFillProps<E>>) {
  const {fillClassName, state} = useContext(ProgressBarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, fillClassName) as string,
    [className, fillClassName],
  );

  return (
    <dom.div
      className={resolvedClassName}
      data-slot="progress-bar-fill"
      style={{
        ...style,
        width: state?.isIndeterminate ? undefined : `${state?.percentage ?? 0}%`,
      }}
      {...(props as any)}
    />
  );
}

ProgressBarFillInner.displayName = "HeroUI.ProgressBar.Fill";

const ProgressBarFill = memo(ProgressBarFillInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: ProgressBarFillProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ProgressBarFillProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ProgressBarRoot, ProgressBarOutput, ProgressBarTrack, ProgressBarFill};

export type {
  ProgressBarRootProps,
  ProgressBarOutputProps,
  ProgressBarTrackProps,
  ProgressBarFillProps,
};
