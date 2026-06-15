"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {PaginationVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {paginationVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";

import {composeTwRenderProps} from "../../utils";
import {dom} from "../../utils/dom";
import {IconChevronLeft, IconChevronRight} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * Pagination Context
 * -----------------------------------------------------------------------------------------------*/
type PaginationContext = {
  contentClassName?: string;
  ellipsisClassName?: string;
  itemClassName?: string;
  linkClassName?: string;
  summaryClassName?: string;
};

const PaginationContext = createContext<PaginationContext>({});

/* -------------------------------------------------------------------------------------------------
 * Pagination Root
 * -----------------------------------------------------------------------------------------------*/
interface PaginationRootProps<
  E extends keyof React.JSX.IntrinsicElements = "nav",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  /** Pagination size. */
  size?: PaginationVariants["size"];
}

function PaginationRootInner<E extends keyof React.JSX.IntrinsicElements = "nav">({
  children,
  className,
  size,
  ...props
}: PaginationRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof PaginationRootProps<E>>) {
  const slots = useMemo(() => paginationVariants({size}), [size]);
  const contextValue = useMemo<PaginationContext>(
    () => ({
      contentClassName: slots.content(),
      ellipsisClassName: slots.ellipsis(),
      itemClassName: slots.item(),
      linkClassName: slots.link(),
      summaryClassName: slots.summary(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  return (
    <PaginationContext value={contextValue}>
      <dom.nav
        aria-label="pagination"
        data-slot="pagination"
        role="navigation"
        {...(props as any)}
        className={resolvedClassName}
      >
        {children}
      </dom.nav>
    </PaginationContext>
  );
}

PaginationRootInner.displayName = "HeroUI.Pagination";

const PaginationRoot = memo(PaginationRootInner) as <
  E extends keyof React.JSX.IntrinsicElements = "nav",
>(
  props: PaginationRootProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PaginationRootProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Pagination Summary
 * -----------------------------------------------------------------------------------------------*/
interface PaginationSummaryProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

function PaginationSummaryInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: PaginationSummaryProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationSummaryProps<E>>) {
  const {summaryClassName} = useContext(PaginationContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, summaryClassName) as string,
    [className, summaryClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="pagination-summary" {...(props as any)}>
      {children}
    </dom.div>
  );
}

PaginationSummaryInner.displayName = "HeroUI.Pagination.Summary";

const PaginationSummary = memo(PaginationSummaryInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: PaginationSummaryProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PaginationSummaryProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Pagination Content
 * -----------------------------------------------------------------------------------------------*/
interface PaginationContentProps<
  E extends keyof React.JSX.IntrinsicElements = "ul",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

function PaginationContentInner<E extends keyof React.JSX.IntrinsicElements = "ul">({
  children,
  className,
  ...props
}: PaginationContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationContentProps<E>>) {
  const {contentClassName} = useContext(PaginationContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contentClassName) as string,
    [className, contentClassName],
  );

  return (
    <dom.ul className={resolvedClassName} data-slot="pagination-content" {...(props as any)}>
      {children}
    </dom.ul>
  );
}

PaginationContentInner.displayName = "HeroUI.Pagination.Content";

const PaginationContent = memo(PaginationContentInner) as <
  E extends keyof React.JSX.IntrinsicElements = "ul",
>(
  props: PaginationContentProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PaginationContentProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Pagination Item
 * -----------------------------------------------------------------------------------------------*/
interface PaginationItemProps<
  E extends keyof React.JSX.IntrinsicElements = "li",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
}

function PaginationItemInner<E extends keyof React.JSX.IntrinsicElements = "li">({
  children,
  className,
  ...props
}: PaginationItemProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof PaginationItemProps<E>>) {
  const {itemClassName} = useContext(PaginationContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, itemClassName) as string,
    [className, itemClassName],
  );

  return (
    <dom.li className={resolvedClassName} data-slot="pagination-item" {...(props as any)}>
      {children}
    </dom.li>
  );
}

PaginationItemInner.displayName = "HeroUI.Pagination.Item";

const PaginationItem = memo(PaginationItemInner) as <
  E extends keyof React.JSX.IntrinsicElements = "li",
>(
  props: PaginationItemProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PaginationItemProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Pagination Link
 * -----------------------------------------------------------------------------------------------*/
interface PaginationLinkProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const PaginationLink = memo(function PaginationLink({
  children,
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  const {linkClassName} = useContext(PaginationContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, linkClassName) as string,
    [className, linkClassName],
  );

  return (
    <ButtonPrimitive
      aria-current={isActive ? "page" : undefined}
      className={resolvedClassName}
      data-active={isActive ? "true" : undefined}
      data-slot="pagination-link"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
});

PaginationLink.displayName = "HeroUI.Pagination.Link";

/* -------------------------------------------------------------------------------------------------
 * Pagination Previous
 * -----------------------------------------------------------------------------------------------*/
interface PaginationPreviousProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
}

const PaginationPrevious = memo(function PaginationPrevious({
  children,
  className,
  ...props
}: PaginationPreviousProps) {
  const {linkClassName} = useContext(PaginationContext);
  const navLinkClassName = useMemo(
    () => `${linkClassName ?? ""} pagination__link--nav`.trim(),
    [linkClassName],
  );
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, navLinkClassName) as string,
    [className, navLinkClassName],
  );

  return (
    <ButtonPrimitive className={resolvedClassName} data-slot="pagination-previous" {...props}>
      {children}
    </ButtonPrimitive>
  );
});

PaginationPrevious.displayName = "HeroUI.Pagination.Previous";

/* -------------------------------------------------------------------------------------------------
 * Pagination Previous Icon
 * -----------------------------------------------------------------------------------------------*/
interface PaginationPreviousIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function PaginationPreviousIconInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: PaginationPreviousIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationPreviousIconProps<E>>) {
  return (
    <dom.span
      aria-hidden="true"
      className={className}
      data-slot="pagination-previous-icon"
      {...(props as any)}
    >
      {children ?? <IconChevronLeft />}
    </dom.span>
  );
}

PaginationPreviousIconInner.displayName = "HeroUI.Pagination.PreviousIcon";

const PaginationPreviousIcon = memo(PaginationPreviousIconInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: PaginationPreviousIconProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PaginationPreviousIconProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Pagination Next
 * -----------------------------------------------------------------------------------------------*/
interface PaginationNextProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
}

const PaginationNext = memo(function PaginationNext({
  children,
  className,
  ...props
}: PaginationNextProps) {
  const {linkClassName} = useContext(PaginationContext);
  const navLinkClassName = useMemo(
    () => `${linkClassName ?? ""} pagination__link--nav`.trim(),
    [linkClassName],
  );
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, navLinkClassName) as string,
    [className, navLinkClassName],
  );

  return (
    <ButtonPrimitive className={resolvedClassName} data-slot="pagination-next" {...props}>
      {children}
    </ButtonPrimitive>
  );
});

PaginationNext.displayName = "HeroUI.Pagination.Next";

/* -------------------------------------------------------------------------------------------------
 * Pagination Next Icon
 * -----------------------------------------------------------------------------------------------*/
interface PaginationNextIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function PaginationNextIconInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: PaginationNextIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationNextIconProps<E>>) {
  return (
    <dom.span
      aria-hidden="true"
      className={className}
      data-slot="pagination-next-icon"
      {...(props as any)}
    >
      {children ?? <IconChevronRight />}
    </dom.span>
  );
}

PaginationNextIconInner.displayName = "HeroUI.Pagination.NextIcon";

const PaginationNextIcon = memo(PaginationNextIconInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: PaginationNextIconProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PaginationNextIconProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Pagination Ellipsis
 * -----------------------------------------------------------------------------------------------*/
interface PaginationEllipsisProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

function PaginationEllipsisInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: PaginationEllipsisProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof PaginationEllipsisProps<E>>) {
  const {ellipsisClassName} = useContext(PaginationContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, ellipsisClassName) as string,
    [className, ellipsisClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="pagination-ellipsis"
      {...(props as any)}
    >
      &hellip;
    </dom.span>
  );
}

PaginationEllipsisInner.displayName = "HeroUI.Pagination.Ellipsis";

const PaginationEllipsis = memo(PaginationEllipsisInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: PaginationEllipsisProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof PaginationEllipsisProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  PaginationRoot,
  PaginationSummary,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationPreviousIcon,
  PaginationNext,
  PaginationNextIcon,
  PaginationEllipsis,
};

export type {
  PaginationRootProps,
  PaginationSummaryProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationPreviousIconProps,
  PaginationNextProps,
  PaginationNextIconProps,
  PaginationEllipsisProps,
};
