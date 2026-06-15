"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {BadgeVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {badgeVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {cx} from "tailwind-variants";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Badge Context
 * -----------------------------------------------------------------------------------------------*/
type BadgeContext = {
  labelClassName?: string;
};

const BadgeContext = createContext<BadgeContext>({});

/* -------------------------------------------------------------------------------------------------
 * Badge Anchor
 * -----------------------------------------------------------------------------------------------*/
interface BadgeAnchorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
  children: ReactNode;
}

function BadgeAnchorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: BadgeAnchorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeAnchorProps<E>>) {
  return (
    <dom.span
      {...(props as any)}
      className={cx("badge-anchor", className) ?? undefined}
      data-slot="badge-anchor"
    >
      {children}
    </dom.span>
  );
}

const BadgeAnchor = memo(BadgeAnchorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: BadgeAnchorProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeAnchorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Badge Root
 * -----------------------------------------------------------------------------------------------*/
interface BadgeRootProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  /** Badge color. */
  color?: BadgeVariants["color"];
  /** Badge placement. */
  placement?: BadgeVariants["placement"];
  /** Badge size. */
  size?: BadgeVariants["size"];
  /** Badge variant. */
  variant?: BadgeVariants["variant"];
}

function BadgeRootInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  color,
  placement,
  size,
  variant,
  ...props
}: BadgeRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeRootProps<E>>) {
  const slots = useMemo(
    () => badgeVariants({color, placement, size, variant}),
    [color, placement, size, variant],
  );
  const contextValue = useMemo<BadgeContext>(
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

  const badgeChildren = useMemo(() => {
    if (typeof children === "string" || typeof children === "number") {
      return <BadgeLabel>{children}</BadgeLabel>;
    }

    return children;
  }, [children]);

  return (
    <BadgeContext value={contextValue}>
      <dom.span {...(props as any)} className={resolvedClassName} data-slot="badge">
        {badgeChildren}
      </dom.span>
    </BadgeContext>
  );
}

const BadgeRoot = memo(BadgeRootInner) as <E extends keyof React.JSX.IntrinsicElements = "span">(
  props: BadgeRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeRootProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Badge Label
 * -----------------------------------------------------------------------------------------------*/
interface BadgeLabelProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function BadgeLabelInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: BadgeLabelProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeLabelProps<E>>) {
  const {labelClassName} = useContext(BadgeContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, labelClassName) as string,
    [className, labelClassName],
  );

  return (
    <dom.span className={resolvedClassName} data-slot="badge-label" {...(props as any)}>
      {children}
    </dom.span>
  );
}

const BadgeLabel = memo(BadgeLabelInner) as <E extends keyof React.JSX.IntrinsicElements = "span">(
  props: BadgeLabelProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeLabelProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {BadgeRoot, BadgeLabel, BadgeAnchor};

export type {BadgeRootProps, BadgeLabelProps, BadgeAnchorProps};
