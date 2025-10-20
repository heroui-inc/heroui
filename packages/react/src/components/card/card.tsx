"use client";

import type {CardVariants} from "./card.styles";

import {Slot} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";

import {cardVariants} from "./card.styles";
/* -------------------------------------------------------------------------------------------------
 * Card Context
 * -----------------------------------------------------------------------------------------------*/
interface CardContext {
  slots?: ReturnType<typeof cardVariants>;
}
const CardContext = createContext<CardContext>({});

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/
interface CardProps extends React.ComponentProps<"div">, CardVariants {
  asChild?: boolean;
}
const Card = ({asChild = false, children, className, variant, ...props}: CardProps) => {
  const slots = React.useMemo(() => cardVariants({variant}), [variant]);
  const Comp = asChild ? Slot : "div";

  return (
    <CardContext value={{slots}}>
      <Comp className={slots.base({className})} data-slot="card" {...props}>
        {children}
      </Comp>
    </CardContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Header
 * -----------------------------------------------------------------------------------------------*/
interface CardHeaderProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}
const CardHeader = ({asChild = false, className, ...props}: CardHeaderProps) => {
  const {slots} = useContext(CardContext);
  const Comp = asChild ? Slot : "div";

  return <Comp className={slots?.header({className})} data-slot="card-header" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Card Title
 * -----------------------------------------------------------------------------------------------*/
interface CardTitleProps extends React.ComponentProps<"h3"> {
  asChild?: boolean;
}
const CardTitle = ({asChild = false, className, ...props}: CardTitleProps) => {
  const {slots} = useContext(CardContext);
  const Comp = asChild ? Slot : "h3";

  return <Comp className={slots?.title({className})} data-slot="card-title" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Card Description
 * -----------------------------------------------------------------------------------------------*/
interface CardDescriptionProps extends React.ComponentProps<"p"> {
  asChild?: boolean;
}
const CardDescription = ({asChild = false, className, ...props}: CardDescriptionProps) => {
  const {slots} = useContext(CardContext);
  const Comp = asChild ? Slot : "p";

  return (
    <Comp className={slots?.description({className})} data-slot="card-description" {...props} />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Content
 * -----------------------------------------------------------------------------------------------*/
interface CardContentProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}
const CardContent = ({asChild = false, className, ...props}: CardContentProps) => {
  const {slots} = useContext(CardContext);
  const Comp = asChild ? Slot : "div";

  return <Comp className={slots?.content({className})} data-slot="card-content" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Card Footer
 * -----------------------------------------------------------------------------------------------*/
interface CardFooterProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}
const CardFooter = ({asChild = false, className, ...props}: CardFooterProps) => {
  const {slots} = useContext(CardContext);
  const Comp = asChild ? Slot : "div";

  return <Comp className={slots?.footer({className})} data-slot="card-footer" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
export {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter};
