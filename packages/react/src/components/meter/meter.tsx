"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {MeterVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {MeterRenderProps} from "react-aria-components/Meter";

import {meterVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Meter as MeterPrimitive} from "react-aria-components/Meter";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Meter Context
 * -----------------------------------------------------------------------------------------------*/
interface MeterContext {
  fillClassName?: string;
  outputClassName?: string;
  state?: MeterRenderProps;
  trackClassName?: string;
}

const MeterContext = createContext<MeterContext>({});

/* -------------------------------------------------------------------------------------------------
 * Meter Root
 * -----------------------------------------------------------------------------------------------*/
interface MeterRootProps extends ComponentPropsWithRef<typeof MeterPrimitive>, MeterVariants {}

const MeterRoot = memo(function MeterRoot({
  children,
  className,
  color,
  size,
  ...props
}: MeterRootProps) {
  const slots = useMemo(() => meterVariants({color, size}), [color, size]);
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
    <MeterPrimitive data-slot="meter" {...props} className={resolvedClassName}>
      {(values) => (
        <MeterContext value={{...slotClassNames, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </MeterContext>
      )}
    </MeterPrimitive>
  );
});

MeterRoot.displayName = "HeroUI.Meter";

/* -------------------------------------------------------------------------------------------------
 * Meter Output
 * -----------------------------------------------------------------------------------------------*/
interface MeterOutputProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function MeterOutputInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: MeterOutputProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterOutputProps<E>>) {
  const {outputClassName, state} = useContext(MeterContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, outputClassName) as string,
    [className, outputClassName],
  );

  return (
    <dom.span className={resolvedClassName} data-slot="meter-output" {...(props as any)}>
      {children ?? state?.valueText}
    </dom.span>
  );
}

MeterOutputInner.displayName = "HeroUI.Meter.Output";

const MeterOutput = memo(MeterOutputInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: MeterOutputProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterOutputProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Meter Track
 * -----------------------------------------------------------------------------------------------*/
interface MeterTrackProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function MeterTrackInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: MeterTrackProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterTrackProps<E>>) {
  const {trackClassName} = useContext(MeterContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, trackClassName) as string,
    [className, trackClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="meter-track" {...(props as any)}>
      {children}
    </dom.div>
  );
}

MeterTrackInner.displayName = "HeroUI.Meter.Track";

const MeterTrack = memo(MeterTrackInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: MeterTrackProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterTrackProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Meter Fill
 * -----------------------------------------------------------------------------------------------*/
interface MeterFillProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function MeterFillInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  style,
  ...props
}: MeterFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterFillProps<E>>) {
  const {fillClassName, state} = useContext(MeterContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, fillClassName) as string,
    [className, fillClassName],
  );

  return (
    <dom.div
      className={resolvedClassName}
      data-slot="meter-fill"
      style={{
        ...style,
        width: `${state?.percentage ?? 0}%`,
      }}
      {...(props as any)}
    />
  );
}

MeterFillInner.displayName = "HeroUI.Meter.Fill";

const MeterFill = memo(MeterFillInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: MeterFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof MeterFillProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MeterRoot, MeterOutput, MeterTrack, MeterFill};

export type {MeterRootProps, MeterOutputProps, MeterTrackProps, MeterFillProps};
