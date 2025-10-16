"use client";

import type {LinkVariants} from "./link.styles";
import type {LinkProps as LinkPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {Link as LinkPrimitive} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
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
      <Component
        ref={ref}
        className={slots?.icon({className})}
        data-default-icon={dataAttr(!children)}
        data-slot="link-icon"
        {...rest}
      >
        {children ?? <DefaultLinkIcon data-slot="link-default-icon" />}
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

export type {LinkRootProps as LinkProps, LinkIconProps};

export default CompoundLink;
