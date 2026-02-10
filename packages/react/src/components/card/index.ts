import type {ComponentProps} from "react";

import {CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle} from "./card";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export type Card = {
  Props: ComponentProps<typeof CardRoot>;
  RootProps: ComponentProps<typeof CardRoot>;
  HeaderProps: ComponentProps<typeof CardHeader>;
  TitleProps: ComponentProps<typeof CardTitle>;
  DescriptionProps: ComponentProps<typeof CardDescription>;
  ContentProps: ComponentProps<typeof CardContent>;
  FooterProps: ComponentProps<typeof CardFooter>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {CardRoot, CardHeader, CardTitle, CardDescription, CardContent, CardFooter};

export type {
  CardRootProps,
  CardRootProps as CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./card";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {cardVariants} from "@heroui/styles";

export type {CardVariants} from "@heroui/styles";
