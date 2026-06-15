"use client";

import type {LinkProps} from "../link";
import type {BreadcrumbsVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {breadcrumbsVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {
  Breadcrumb as BreadcrumbPrimitive,
  Breadcrumbs as BreadcrumbsPrimitive,
} from "react-aria-components/Breadcrumbs";

import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronRight} from "../icons";
import {Link} from "../link";

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Context
 * -----------------------------------------------------------------------------------------------*/
type BreadcrumbsContext = {
  itemClassName?: string;
  linkClassName?: string;
  separator?: React.ReactNode;
  separatorClassName?: string;
};

const BreadcrumbsContext = createContext<BreadcrumbsContext>({});

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Root
 * -----------------------------------------------------------------------------------------------*/
interface BreadcrumbsRootProps
  extends ComponentPropsWithRef<typeof BreadcrumbsPrimitive>, BreadcrumbsVariants {
  separator?: React.ReactNode;
}

const BreadcrumbsRoot = memo(function BreadcrumbsRoot({
  children,
  className,
  separator,
  ...props
}: BreadcrumbsRootProps) {
  const slots = useMemo(() => breadcrumbsVariants({}), []);
  const contextValue = useMemo<BreadcrumbsContext>(
    () => ({
      itemClassName: slots.item(),
      linkClassName: slots.link(),
      separator,
      separatorClassName: slots.separator(),
    }),
    [slots, separator],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  return (
    <BreadcrumbsContext.Provider value={contextValue}>
      <BreadcrumbsPrimitive data-slot="breadcrumbs" {...props} className={resolvedClassName}>
        {children}
      </BreadcrumbsPrimitive>
    </BreadcrumbsContext.Provider>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Breadcrumbs Item
 * -----------------------------------------------------------------------------------------------*/
interface BreadcrumbsItemProps extends ComponentPropsWithRef<typeof BreadcrumbPrimitive> {}

const BreadcrumbsItem = memo(function BreadcrumbsItem({
  children,
  className,
  ...props
}: BreadcrumbsItemProps & Omit<LinkProps, "className">) {
  const {itemClassName, linkClassName, separator, separatorClassName} =
    useContext(BreadcrumbsContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, itemClassName),
    [className, itemClassName],
  );

  const renderSeparator = () => {
    if (!separator)
      return <IconChevronRight className={separatorClassName} data-slot="breadcrumbs-separator" />;

    if (React.isValidElement(separator)) {
      return React.cloneElement(
        separator as React.ReactElement<{
          className?: string;
          "data-slot": "breadcrumbs-separator";
        }>,
        {
          className: separatorClassName,
          "data-slot": "breadcrumbs-separator",
        },
      );
    }

    return separator;
  };

  return (
    <BreadcrumbPrimitive className={resolvedClassName} data-slot="breadcrumbs-item" {...props}>
      {({isCurrent}) => {
        if (typeof children === "function") {
          return children({} as any);
        }

        return (
          <>
            <Link className={linkClassName} {...props}>
              {children}
            </Link>
            {!isCurrent && renderSeparator()}
          </>
        );
      }}
    </BreadcrumbPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {BreadcrumbsRoot, BreadcrumbsItem};

export type {BreadcrumbsRootProps, BreadcrumbsItemProps};
