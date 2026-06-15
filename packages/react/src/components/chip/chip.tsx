"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ChipVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {chipVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Chip Context
 * -----------------------------------------------------------------------------------------------*/
type ChipContext = {
  labelClassName?: string;
};

const ChipContext = createContext<ChipContext>({});

/* -------------------------------------------------------------------------------------------------
 * Chip Root
 * -----------------------------------------------------------------------------------------------*/
interface ChipRootProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Chip color. */
  color?: ChipVariants["color"];
  /** Chip size. */
  size?: ChipVariants["size"];
  /** Chip variant. */
  variant?: ChipVariants["variant"];
}

function ChipRootInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  color,
  size,
  variant,
  ...props
}: ChipRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipRootProps<E>>) {
  const slots = useMemo(() => chipVariants({color, size, variant}), [color, size, variant]);
  const contextValue = useMemo<ChipContext>(
    () => ({
      labelClassName: slots.label(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  const chipChildren = useMemo(() => {
    if (typeof children === "string" || typeof children === "number") {
      return <ChipLabel>{children}</ChipLabel>;
    }

    return children;
  }, [children]);

  return (
    <ChipContext value={contextValue}>
      <dom.span {...(props as any)} className={resolvedClassName} data-slot="chip">
        {chipChildren}
      </dom.span>
    </ChipContext>
  );
}

const ChipRoot = memo(ChipRootInner) as <E extends keyof React.JSX.IntrinsicElements = "span">(
  props: ChipRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipRootProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Chip Label
 * -----------------------------------------------------------------------------------------------*/
interface ChipLabelProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ChipLabelInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: ChipLabelProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipLabelProps<E>>) {
  const {labelClassName} = useContext(ChipContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, labelClassName) as string,
    [className, labelClassName],
  );

  return (
    <dom.span className={resolvedClassName} data-slot="chip-label" {...(props as any)}>
      {children}
    </dom.span>
  );
}

const ChipLabel = memo(ChipLabelInner) as <E extends keyof React.JSX.IntrinsicElements = "span">(
  props: ChipLabelProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof ChipLabelProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ChipRoot, ChipLabel};

export type {ChipRootProps, ChipLabelProps};
