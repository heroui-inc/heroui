"use client";

import type {BreadcrumbsVariants} from "./breadcrumbs.styles";
import type {LinkProps} from "../link";
import type {ComponentPropsWithRef} from "react";

import {Icon} from "@iconify/react";
import React, {createContext, useContext} from "react";
import {
  Breadcrumb as BreadcrumbPrimitive,
  Breadcrumbs as BreadcrumbsPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {Link} from "../link";

import {breadcrumbsVariants} from "./breadcrumbs.styles";

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Context
 * -----------------------------------------------------------------------------------------------*/
type BreadcrumbsContext = {
  slots?: ReturnType<typeof breadcrumbsVariants>;
  separator?: React.ReactNode;
};

const BreadcrumbsContext = createContext<BreadcrumbsContext>({});

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Root
 * -----------------------------------------------------------------------------------------------*/
interface BreadcrumbsRootProps
  extends ComponentPropsWithRef<typeof BreadcrumbsPrimitive>, BreadcrumbsVariants {
  separator?: React.ReactNode;
}

const BreadcrumbsRoot = ({children, className, separator, ...props}: BreadcrumbsRootProps) => {
  const slots = React.useMemo(() => breadcrumbsVariants({}), []);

  return (
    <BreadcrumbsContext.Provider value={{slots, separator}}>
      <BreadcrumbsPrimitive
        data-slot="breadcrumbs"
        {...props}
        className={composeSlotClassName(slots.base, className)}
      >
        {children}
      </BreadcrumbsPrimitive>
    </BreadcrumbsContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Item
 * -----------------------------------------------------------------------------------------------*/
interface BreadcrumbsItemProps extends ComponentPropsWithRef<typeof BreadcrumbPrimitive> {}

const BreadcrumbsItem = ({
  children,
  className,
  ...props
}: BreadcrumbsItemProps & Omit<LinkProps, "className">) => {
  const {separator, slots} = useContext(BreadcrumbsContext);

  const renderSeparator = () => {
    if (!separator)
      return (
        <Icon
          className={slots?.separator()}
          data-slot="breadcrumbs-separator"
          icon="gravity-ui:chevron-right"
        />
      );

    if (React.isValidElement(separator)) {
      return React.cloneElement(
        separator as React.ReactElement<{
          className?: string;
          "data-slot": "breadcrumbs-separator";
        }>,
        {
          className: slots?.separator(),
          "data-slot": "breadcrumbs-separator",
        },
      );
    }

    return separator;
  };

  return (
    <BreadcrumbPrimitive
      className={composeTwRenderProps(className, slots?.item())}
      data-slot="breadcrumbs-item"
      {...props}
    >
      {({isCurrent}) => {
        if (typeof children === "function") {
          return children({} as any);
        }

        return (
          <>
            <Link className={slots?.link()}>{children}</Link>
            {!isCurrent && renderSeparator()}
          </>
        );
      }}
    </BreadcrumbPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {BreadcrumbsRoot, BreadcrumbsItem};

export type {BreadcrumbsRootProps, BreadcrumbsItemProps};
