"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {LinkVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {linkVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Link as LinkPrimitive} from "react-aria-components/Link";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {ExternalLinkIcon} from "../icons";

/* ------------------------------------------------------------------------------------------------
 * Link Context
 * --------------------------------------------------------------------------------------------- */
type LinkContext = {
  iconClassName?: string;
};

const LinkContext = createContext<LinkContext>({});

/* ------------------------------------------------------------------------------------------------
 * Link Root
 * --------------------------------------------------------------------------------------------- */
interface LinkRootProps extends ComponentPropsWithRef<typeof LinkPrimitive>, LinkVariants {}

const LinkRoot = memo(function LinkRoot({children, className, ...props}: LinkRootProps) {
  const slots = useMemo(() => linkVariants(), []);
  const contextValue = useMemo<LinkContext>(
    () => ({
      iconClassName: slots.icon(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <LinkContext value={contextValue}>
      <LinkPrimitive {...props} className={composeTwRenderProps(className, baseClassName)}>
        {typeof children === "function" ? (values) => children(values) : children}
      </LinkPrimitive>
    </LinkContext>
  );
});

/* ------------------------------------------------------------------------------------------------
 * Link Icon
 * --------------------------------------------------------------------------------------------- */
interface LinkIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function LinkIconInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...rest
}: LinkIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof LinkIconProps<E>>) {
  const {iconClassName} = useContext(LinkContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, iconClassName) as string,
    [className, iconClassName],
  );

  return (
    <dom.span
      className={resolvedClassName}
      data-default-icon={dataAttr(!children)}
      data-slot="link-icon"
      {...(rest as any)}
    >
      {children ?? <ExternalLinkIcon data-slot="link-default-icon" />}
    </dom.span>
  );
}

const LinkIcon = memo(LinkIconInner) as <E extends keyof React.JSX.IntrinsicElements = "span">(
  props: LinkIconProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof LinkIconProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {LinkRoot, LinkIcon};

export type {LinkRootProps, LinkIconProps};
