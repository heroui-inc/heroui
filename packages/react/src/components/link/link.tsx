"use client";

import type {LinkVariants} from "./link.styles";
import type {LinkProps as LinkPrimitiveProps} from "react-aria-components";

import {Link as LinkPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {linkVariants} from "./link.styles";

interface LinkProps extends LinkPrimitiveProps, LinkVariants {
  ref?: React.RefObject<HTMLAnchorElement>;
}

const Link = ({className, ref, ...props}: LinkProps) => {
  return (
    <LinkPrimitive ref={ref} {...props} className={composeTwRenderProps(className, linkVariants())}>
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </LinkPrimitive>
  );
};

Link.displayName = "HeroUI.Link";

export type {LinkProps};
export {Link};
