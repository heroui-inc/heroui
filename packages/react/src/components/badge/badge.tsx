"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {BadgeVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {badgeVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {cx} from "tailwind-variants";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Badge Context
 * -----------------------------------------------------------------------------------------------*/
type BadgeContext = {
  slots?: ReturnType<typeof badgeVariants>;
};

const BadgeContext = createContext<BadgeContext>({});

/* -------------------------------------------------------------------------------------------------
 * Badge Anchor
 * -----------------------------------------------------------------------------------------------*/
interface BadgeAnchorProps extends ComponentPropsWithRef<"span"> {
  className?: string;
  children: React.ReactNode;
}

const BadgeAnchor = ({children, className, ...props}: BadgeAnchorProps) => {
  return (
    <span
      {...props}
      className={cx("badge-anchor", className) ?? undefined}
      data-slot="badge-anchor"
    >
      {children}
    </span>
  );
};

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

const BadgeRoot = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  color,
  placement,
  size,
  variant,
  ...props
}: BadgeRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BadgeRootProps<E>>) => {
  const slots = React.useMemo(
    () => badgeVariants({color, placement, size, variant}),
    [color, placement, size, variant],
  );

  const badgeChildren = React.useMemo(() => {
    if (typeof children === "string" || typeof children === "number") {
      return <BadgeLabel>{children}</BadgeLabel>;
    }

    return children;
  }, [children]);

  return (
    <BadgeContext value={{slots}}>
      <dom.span
        {...(props as any)}
        className={composeSlotClassName(slots.base, className)}
        data-slot="badge"
      >
        {badgeChildren}
      </dom.span>
    </BadgeContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Badge Label
 * -----------------------------------------------------------------------------------------------*/
interface BadgeLabelProps extends ComponentPropsWithRef<"span"> {
  className?: string;
}

const BadgeLabel = ({children, className, ...props}: BadgeLabelProps) => {
  const {slots} = useContext(BadgeContext);

  return (
    <span
      className={composeSlotClassName(slots?.label, className)}
      data-slot="badge-label"
      {...props}
    >
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {BadgeRoot, BadgeLabel, BadgeAnchor};

export type {BadgeRootProps, BadgeLabelProps, BadgeAnchorProps};
