"use client";

import type {LinkVariants} from "./link.styles";
import type {LinkProps as LinkPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {Link as LinkPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {LinkIcon as DefaultLinkIcon} from "../icons";

import {linkVariants} from "./link.styles";

/* ------------------------------------------------------------------------------------------------
 * Link Context
 * --------------------------------------------------------------------------------------------- */
type LinkContext = {
  slots?: ReturnType<typeof linkVariants>;
};

const LinkContext = createContext<LinkContext>({});

/* ------------------------------------------------------------------------------------------------
 * Link Root
 * --------------------------------------------------------------------------------------------- */
interface LinkRootProps extends LinkPrimitiveProps, LinkVariants {}

const LinkRoot = React.forwardRef<React.ElementRef<typeof LinkPrimitive>, LinkRootProps>(
  ({children, className, iconPlacement = "end", showIcon = false, ...props}, ref) => {
    const slots = React.useMemo(
      () => linkVariants({showIcon, iconPlacement}),
      [showIcon, iconPlacement],
    );

    return (
      <LinkContext.Provider value={{slots}}>
        <LinkPrimitive
          ref={ref}
          {...props}
          className={composeTwRenderProps(className, slots?.base())}
        >
          {(values) => <>{typeof children === "function" ? children(values) : children}</>}
        </LinkPrimitive>
      </LinkContext.Provider>
    );
  },
);

LinkRoot.displayName = "HeroUI.Link";

/* ------------------------------------------------------------------------------------------------
 * Link Icon
 * --------------------------------------------------------------------------------------------- */
type LinkIconProps = React.ComponentProps<"span"> & {
  asChild?: boolean;
};

const LinkIconComponent = React.forwardRef<HTMLSpanElement, LinkIconProps>(
  ({asChild, children, className, ...rest}, ref) => {
    const {slots} = useContext(LinkContext);

    const Component = asChild ? SlotPrimitive : "span";

    return (
      <Component ref={ref} data-link-icon className={slots?.icon({className})} {...rest}>
        {children ?? <DefaultLinkIcon data-link-default-icon />}
      </Component>
    );
  },
);

LinkIconComponent.displayName = "HeroUI.Link.Icon";

/* ------------------------------------------------------------------------------------------------
 * Compound Link Component
 * --------------------------------------------------------------------------------------------- */
const CompoundLink = Object.assign(LinkRoot, {
  Icon: LinkIconComponent,
});

/* ------------------------------------------------------------------------------------------------
 * Legacy Link Component (for backward compatibility)
 * --------------------------------------------------------------------------------------------- */
const Link = React.forwardRef<React.ElementRef<typeof LinkPrimitive>, LinkRootProps>(
  (props, ref) => {
    return <LinkRoot ref={ref} {...props} />;
  },
);

Link.displayName = "HeroUI.Link";

export type {LinkRootProps as LinkProps, LinkIconProps};
export {CompoundLink as Link, LinkRoot, LinkIconComponent as LinkIcon};
