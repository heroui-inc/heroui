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
 * Link Root
 * --------------------------------------------------------------------------------------------- */
interface LinkRootProps extends LinkPrimitiveProps, LinkVariants {
  asChild?: boolean;
}

const LinkRoot = ({
  asChild,
  children,
  className,
  slot,
  style,
  underline,
  underlineOffset,
  ...props
}: LinkRootProps) => {
  const slots = React.useMemo(
    () => linkVariants({underline, underlineOffset}),
    [underline, underlineOffset],
  );

  const styles = slots?.base({
    className: typeof className === "string" ? className : undefined,
  });

  if (asChild) {
    return (
      <LinkContext value={{slots}}>
        <SlotPrimitive
          className={styles}
          slot={slot as string}
          style={style as React.CSSProperties}
          {...(props as any)}
        >
          {typeof children === "function" ? children({} as any) : children}
        </SlotPrimitive>
      </LinkContext>
    );
  }

  return (
    <LinkContext value={{slots}}>
      <LinkPrimitive {...props} className={composeTwRenderProps(className, slots?.base())}>
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </LinkPrimitive>
    </LinkContext>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Link Icon
 * --------------------------------------------------------------------------------------------- */
type LinkIconProps = React.ComponentProps<"span"> & {
  asChild?: boolean;
};

const LinkIcon = ({asChild, children, className, ...rest}: LinkIconProps) => {
  const {slots} = useContext(LinkContext);
  const Component = asChild ? SlotPrimitive : "span";

  return (
    <Component
      className={slots?.icon({className})}
      data-default-icon={dataAttr(!children)}
      data-slot="link-icon"
      {...rest}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </Component>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------------------------- */
export type {LinkRootProps, LinkIconProps};
export {LinkRoot, LinkIcon};
