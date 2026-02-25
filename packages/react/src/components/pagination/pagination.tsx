"use client";

import type {PaginationVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {paginationVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Button as ButtonPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {composeSlotClassName} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Pagination Context
 * -----------------------------------------------------------------------------------------------*/
type PaginationContext = {
  slots?: ReturnType<typeof paginationVariants>;
};

const PaginationContext = createContext<PaginationContext>({});

/* -------------------------------------------------------------------------------------------------
 * Pagination Root
 * -----------------------------------------------------------------------------------------------*/
interface PaginationRootProps extends ComponentPropsWithRef<"nav">, PaginationVariants {
  className?: string;
  children: React.ReactNode;
}

const PaginationRoot = ({children, className, size, ...props}: PaginationRootProps) => {
  const slots = React.useMemo(() => paginationVariants({size}), [size]);

  return (
    <PaginationContext value={{slots}}>
      <nav
        aria-label="pagination"
        data-slot="pagination"
        role="navigation"
        {...props}
        className={composeSlotClassName(slots.base, className)}
      >
        {children}
      </nav>
    </PaginationContext>
  );
};

PaginationRoot.displayName = "HeroUI.Pagination";

/* -------------------------------------------------------------------------------------------------
 * Pagination Summary
 * -----------------------------------------------------------------------------------------------*/
interface PaginationSummaryProps extends ComponentPropsWithRef<"div"> {
  className?: string;
  children: React.ReactNode;
}

const PaginationSummary = ({children, className, ...props}: PaginationSummaryProps) => {
  const {slots} = useContext(PaginationContext);

  return (
    <div
      className={composeSlotClassName(slots?.summary, className)}
      data-slot="pagination-summary"
      {...props}
    >
      {children}
    </div>
  );
};

PaginationSummary.displayName = "HeroUI.Pagination.Summary";

/* -------------------------------------------------------------------------------------------------
 * Pagination Content
 * -----------------------------------------------------------------------------------------------*/
interface PaginationContentProps extends ComponentPropsWithRef<"ul"> {
  className?: string;
  children: React.ReactNode;
}

const PaginationContent = ({children, className, ...props}: PaginationContentProps) => {
  const {slots} = useContext(PaginationContext);

  return (
    <ul
      className={composeSlotClassName(slots?.content, className)}
      data-slot="pagination-content"
      {...props}
    >
      {children}
    </ul>
  );
};

PaginationContent.displayName = "HeroUI.Pagination.Content";

/* -------------------------------------------------------------------------------------------------
 * Pagination Item
 * -----------------------------------------------------------------------------------------------*/
interface PaginationItemProps extends ComponentPropsWithRef<"li"> {
  className?: string;
  children: React.ReactNode;
}

const PaginationItem = ({children, className, ...props}: PaginationItemProps) => {
  const {slots} = useContext(PaginationContext);

  return (
    <li
      className={composeSlotClassName(slots?.item, className)}
      data-slot="pagination-item"
      {...props}
    >
      {children}
    </li>
  );
};

PaginationItem.displayName = "HeroUI.Pagination.Item";

/* -------------------------------------------------------------------------------------------------
 * Pagination Link
 * -----------------------------------------------------------------------------------------------*/
interface PaginationLinkProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const PaginationLink = ({children, className, isActive, ...props}: PaginationLinkProps) => {
  const {slots} = useContext(PaginationContext);

  return (
    <ButtonPrimitive
      aria-current={isActive ? "page" : undefined}
      className={composeTwRenderProps(className, slots?.link())}
      data-active={isActive ? "true" : undefined}
      data-slot="pagination-link"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

PaginationLink.displayName = "HeroUI.Pagination.Link";

/* -------------------------------------------------------------------------------------------------
 * Pagination Previous
 * -----------------------------------------------------------------------------------------------*/
interface PaginationPreviousProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
}

const PaginationPrevious = ({children, className, ...props}: PaginationPreviousProps) => {
  const {slots} = useContext(PaginationContext);
  const baseClass = `${slots?.link() ?? ""} pagination__link--nav`.trim();

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, baseClass)}
      data-slot="pagination-previous"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

PaginationPrevious.displayName = "HeroUI.Pagination.Previous";

/* -------------------------------------------------------------------------------------------------
 * Pagination Previous Icon
 * -----------------------------------------------------------------------------------------------*/
interface PaginationPreviousIconProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  children?: React.ReactNode;
}

const PaginationPreviousIcon = ({children, className, ...props}: PaginationPreviousIconProps) => {
  return (
    <span aria-hidden="true" className={className} data-slot="pagination-previous-icon" {...props}>
      {children ?? <ChevronLeftIcon />}
    </span>
  );
};

PaginationPreviousIcon.displayName = "HeroUI.Pagination.PreviousIcon";

/* -------------------------------------------------------------------------------------------------
 * Pagination Next
 * -----------------------------------------------------------------------------------------------*/
interface PaginationNextProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  className?: string;
  children: React.ReactNode;
}

const PaginationNext = ({children, className, ...props}: PaginationNextProps) => {
  const {slots} = useContext(PaginationContext);
  const baseClass = `${slots?.link() ?? ""} pagination__link--nav`.trim();

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, baseClass)}
      data-slot="pagination-next"
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};

PaginationNext.displayName = "HeroUI.Pagination.Next";

/* -------------------------------------------------------------------------------------------------
 * Pagination Next Icon
 * -----------------------------------------------------------------------------------------------*/
interface PaginationNextIconProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  children?: React.ReactNode;
}

const PaginationNextIcon = ({children, className, ...props}: PaginationNextIconProps) => {
  return (
    <span aria-hidden="true" className={className} data-slot="pagination-next-icon" {...props}>
      {children ?? <ChevronRightIcon />}
    </span>
  );
};

PaginationNextIcon.displayName = "HeroUI.Pagination.NextIcon";

/* -------------------------------------------------------------------------------------------------
 * Pagination Ellipsis
 * -----------------------------------------------------------------------------------------------*/
interface PaginationEllipsisProps extends ComponentPropsWithRef<"span"> {
  className?: string;
}

const PaginationEllipsis = ({className, ...props}: PaginationEllipsisProps) => {
  const {slots} = useContext(PaginationContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.ellipsis, className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      &hellip;
    </span>
  );
};

PaginationEllipsis.displayName = "HeroUI.Pagination.Ellipsis";

/* -------------------------------------------------------------------------------------------------
 * Icons
 * -----------------------------------------------------------------------------------------------*/
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="1em"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

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
