"use client";

import type {LinkVariants} from "./link.styles";
import type {LinkProps as LinkPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {Link as LinkPrimitive} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {ExternalLinkIcon} from "../icons";

import {linkVariants} from "./link.styles";

/* ------------------------------------------------------------------------------------------------
 * Link Context
 * --------------------------------------------------------------------------------------------- */
type LinkContext = {
  slots?: ReturnType<typeof linkVariants>;
};

const LinkContext = createContext<LinkContext>({});

/* ------------------------------------------------------------------------------------------------
 * Link
 * --------------------------------------------------------------------------------------------- */
interface LinkProps extends LinkPrimitiveProps, LinkVariants {}

const Link = React.forwardRef<React.ComponentRef<typeof LinkPrimitive>, LinkProps>(
  ({children, className, ...props}, ref) => {
    const slots = React.useMemo(() => linkVariants({}), []);

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

Link.displayName = "HeroUI.Link";

/* ------------------------------------------------------------------------------------------------
 * Link Icon
 * --------------------------------------------------------------------------------------------- */
type LinkIconProps = React.ComponentProps<"span"> & {
  asChild?: boolean;
};

const LinkIcon = React.forwardRef<HTMLSpanElement, LinkIconProps>(
  ({asChild, children, className, ...rest}, ref) => {
    const {slots} = useContext(LinkContext);

    const Component = asChild ? SlotPrimitive : "span";

    return (
      <Component
        ref={ref}
        className={slots?.icon({className})}
        data-default-icon={dataAttr(!children)}
        data-slot="link-icon"
        {...rest}
      >
        {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
      </Component>
    );
  },
);

LinkIcon.displayName = "HeroUI.LinkIcon";

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */

export type {LinkProps, LinkIconProps};
export {Link, LinkIcon};
