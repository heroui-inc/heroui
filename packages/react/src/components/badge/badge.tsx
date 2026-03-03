"use client";

import type {BadgeVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {badgeVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {cx} from "tailwind-variants";

import {composeSlotClassName} from "../../utils/compose";

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
interface BadgeRootProps extends Omit<ComponentPropsWithRef<"span">, "color">, BadgeVariants {
  className?: string;
  children?: React.ReactNode;
}

const BadgeRoot = ({
  children,
  className,
  color,
  placement,
  size,
  variant,
  ...props
}: BadgeRootProps) => {
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
      <span {...props} className={composeSlotClassName(slots.base, className)} data-slot="badge">
        {badgeChildren}
      </span>
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
