"use client";

import type {CardVariants} from "./card.styles";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef} from "react";

import {Slot} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";

import {SurfaceContext} from "../surface";

import {cardVariants} from "./card.styles";
/* -------------------------------------------------------------------------------------------------
 * Card Context
 * -----------------------------------------------------------------------------------------------*/
interface CardContext {
  slots?: ReturnType<typeof cardVariants>;
}

const CardContext = createContext<CardContext>({});

/* -------------------------------------------------------------------------------------------------
 * Card Root
 * -----------------------------------------------------------------------------------------------*/
interface CardRootProps extends ComponentPropsWithRef<"div">, CardVariants {
  asChild?: boolean;
}

const CardRoot = ({
  asChild = false,
  children,
  className,
  variant = "default",
  ...props
}: CardRootProps) => {
  const slots = React.useMemo(() => cardVariants({variant}), [variant]);
  const Comp = asChild ? Slot : "div";

  const content = (
    <Comp className={slots.base({className})} data-slot="card" {...props}>
      {children}
    </Comp>
  );

  return (
    <CardContext value={{slots}}>
      {variant === "transparent" ? (
        content
      ) : (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext.Provider
          value={{
            variant: variant as SurfaceVariants["variant"],
          }}
        >
          {content}
        </SurfaceContext.Provider>
      )}
    </CardContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Header
 * -----------------------------------------------------------------------------------------------*/
interface CardHeaderProps extends ComponentPropsWithRef<"div"> {
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
interface CardTitleProps extends ComponentPropsWithRef<"h3"> {
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
interface CardDescriptionProps extends ComponentPropsWithRef<"p"> {
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
interface CardContentProps extends ComponentPropsWithRef<"div"> {
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
interface CardFooterProps extends ComponentPropsWithRef<"div"> {
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
export {CardRoot, CardHeader, CardTitle, CardDescription, CardContent, CardFooter};

export type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
