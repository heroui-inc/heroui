import type {ComponentProps} from "react";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationNextIcon,
  PaginationPrevious,
  PaginationPreviousIcon,
  PaginationRoot,
  PaginationSummary,
} from "./pagination";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  NextIcon: PaginationNextIcon,
  Previous: PaginationPrevious,
  PreviousIcon: PaginationPreviousIcon,
  Root: PaginationRoot,
  Summary: PaginationSummary,
});

export type Pagination = {
  ContentProps: ComponentProps<typeof PaginationContent>;
  EllipsisProps: ComponentProps<typeof PaginationEllipsis>;
  ItemProps: ComponentProps<typeof PaginationItem>;
  LinkProps: ComponentProps<typeof PaginationLink>;
  NextIconProps: ComponentProps<typeof PaginationNextIcon>;
  NextProps: ComponentProps<typeof PaginationNext>;
  PreviousIconProps: ComponentProps<typeof PaginationPreviousIcon>;
  PreviousProps: ComponentProps<typeof PaginationPrevious>;
  Props: ComponentProps<typeof PaginationRoot>;
  RootProps: ComponentProps<typeof PaginationRoot>;
  SummaryProps: ComponentProps<typeof PaginationSummary>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
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
  PaginationRootProps as PaginationProps,
  PaginationSummaryProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationPreviousIconProps,
  PaginationNextProps,
  PaginationNextIconProps,
  PaginationEllipsisProps,
} from "./pagination";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {paginationVariants} from "@heroui/styles";

export type {PaginationVariants} from "@heroui/styles";
