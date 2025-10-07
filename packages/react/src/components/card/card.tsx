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

interface CardRootProps extends React.HTMLAttributes<HTMLDivElement>, CardVariants {
  asChild?: boolean;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({asChild = false, children, className, variant, ...props}, ref) => {
    const slots = React.useMemo(() => cardVariants({variant}), [variant]);
    const Comp = asChild ? Slot : "div";

    return (
      <CardContext.Provider value={{slots}}>
        <Comp ref={ref} className={slots.base({className})} data-slot="card" {...props}>
          {children}
        </Comp>
      </CardContext.Provider>
    );
  },
);

CardRoot.displayName = "HeroUI.Card";

/* -------------------------------------------------------------------------------------------------
 * Card Header
 * -----------------------------------------------------------------------------------------------*/

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({asChild = false, className, ...props}, ref) => {
    const {slots} = useContext(CardContext);
    const Comp = asChild ? Slot : "div";

    return (
      <Comp ref={ref} className={slots?.header({className})} data-slot="card-header" {...props} />
    );
  },
);

CardHeader.displayName = "HeroUI.Card.Header";

/* -------------------------------------------------------------------------------------------------
 * Card Title
 * -----------------------------------------------------------------------------------------------*/

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({asChild = false, className, ...props}, ref) => {
    const {slots} = useContext(CardContext);
    const Comp = asChild ? Slot : "h3";

    return (
      <Comp ref={ref} className={slots?.title({className})} data-slot="card-title" {...props} />
    );
  },
);

CardTitle.displayName = "HeroUI.Card.Title";

/* -------------------------------------------------------------------------------------------------
 * Card Description
 * -----------------------------------------------------------------------------------------------*/

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({asChild = false, className, ...props}, ref) => {
    const {slots} = useContext(CardContext);
    const Comp = asChild ? Slot : "p";

    return (
      <Comp
        ref={ref}
        className={slots?.description({className})}
        data-slot="card-description"
        {...props}
      />
    );
  },
);

CardDescription.displayName = "HeroUI.Card.Description";

/* -------------------------------------------------------------------------------------------------
 * Card Content
 * -----------------------------------------------------------------------------------------------*/

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({asChild = false, className, ...props}, ref) => {
    const {slots} = useContext(CardContext);
    const Comp = asChild ? Slot : "div";

    return (
      <Comp ref={ref} className={slots?.content({className})} data-slot="card-content" {...props} />
    );
  },
);

CardContent.displayName = "HeroUI.Card.Content";

/* -------------------------------------------------------------------------------------------------
 * Card Footer
 * -----------------------------------------------------------------------------------------------*/

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({asChild = false, className, ...props}, ref) => {
    const {slots} = useContext(CardContext);
    const Comp = asChild ? Slot : "div";

    return (
      <Comp ref={ref} className={slots?.footer({className})} data-slot="card-footer" {...props} />
    );
  },
);

CardFooter.displayName = "HeroUI.Card.Footer";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundCard = Object.assign(CardRoot, {
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle,
});

export type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};

export default CompoundCard;
