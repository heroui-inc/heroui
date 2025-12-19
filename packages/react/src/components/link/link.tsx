"use client";

import type {LinkVariants} from "./link.styles";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";
import {Link as LinkPrimitive} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
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
interface LinkRootProps extends ComponentPropsWithRef<typeof LinkPrimitive>, LinkVariants {}

const LinkRoot = ({children, className, underline, underlineOffset, ...props}: LinkRootProps) => {
  const slots = React.useMemo(
    () => linkVariants({underline, underlineOffset}),
    [underline, underlineOffset],
  );

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
type LinkIconProps = ComponentPropsWithRef<"span">;

const LinkIcon = ({children, className, ...rest}: LinkIconProps) => {
  const {slots} = useContext(LinkContext);

  return (
    <span
      className={composeSlotClassName(slots?.icon, className)}
      data-default-icon={dataAttr(!children)}
      data-slot="link-icon"
      {...rest}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LinkRoot, LinkIcon};

export type {LinkRootProps, LinkIconProps};
