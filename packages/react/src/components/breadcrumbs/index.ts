import type {ComponentProps} from "react";

import {BreadcrumbsItem, BreadcrumbsRoot} from "./breadcrumbs";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Root: BreadcrumbsRoot,
  Item: BreadcrumbsItem,
});

export type Breadcrumbs = {
  Props: ComponentProps<typeof BreadcrumbsRoot>;
  RootProps: ComponentProps<typeof BreadcrumbsRoot>;
  ItemProps: ComponentProps<typeof BreadcrumbsItem>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {BreadcrumbsRoot, BreadcrumbsItem};

export type {
  BreadcrumbsRootProps,
  BreadcrumbsRootProps as BreadcrumbsProps,
  BreadcrumbsItemProps,
} from "./breadcrumbs";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {breadcrumbsVariants} from "./breadcrumbs.styles";

export type {BreadcrumbsVariants} from "./breadcrumbs.styles";
