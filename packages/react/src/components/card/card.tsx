"use client";

import type {CardVariants} from "./card.styles";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";
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
interface CardRootProps extends ComponentPropsWithRef<"div">, CardVariants {}

const CardRoot = ({children, className, variant = "default", ...props}: CardRootProps) => {
  const slots = React.useMemo(() => cardVariants({variant}), [variant]);

  const content = (
    <div className={slots.base({className})} data-slot="card" {...props}>
      {children}
    </div>
  );

  return (
    <CardContext value={{slots}}>
      {variant === "transparent" ? (
        content
      ) : (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext
          value={{
            variant: variant as SurfaceVariants["variant"],
          }}
        >
          {content}
        </SurfaceContext>
      )}
    </CardContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Header
 * -----------------------------------------------------------------------------------------------*/
interface CardHeaderProps extends ComponentPropsWithRef<"div"> {}

const CardHeader = ({className, ...props}: CardHeaderProps) => {
  const {slots} = useContext(CardContext);

  return (
    <div
      className={composeSlotClassName(slots?.header, className)}
      data-slot="card-header"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Title
 * -----------------------------------------------------------------------------------------------*/
interface CardTitleProps extends ComponentPropsWithRef<"h3"> {}

const CardTitle = ({children, className, ...props}: CardTitleProps) => {
  const {slots} = useContext(CardContext);

  return (
    <h3 className={composeSlotClassName(slots?.title, className)} data-slot="card-title" {...props}>
      {children}
    </h3>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Description
 * -----------------------------------------------------------------------------------------------*/
interface CardDescriptionProps extends ComponentPropsWithRef<"p"> {}

const CardDescription = ({children, className, ...props}: CardDescriptionProps) => {
  const {slots} = useContext(CardContext);

  return (
    <p
      className={composeSlotClassName(slots?.description, className)}
      data-slot="card-description"
      {...props}
    >
      {children}
    </p>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Content
 * -----------------------------------------------------------------------------------------------*/
interface CardContentProps extends ComponentPropsWithRef<"div"> {}

const CardContent = ({className, ...props}: CardContentProps) => {
  const {slots} = useContext(CardContext);

  return (
    <div
      className={composeSlotClassName(slots?.content, className)}
      data-slot="card-content"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Card Footer
 * -----------------------------------------------------------------------------------------------*/
interface CardFooterProps extends ComponentPropsWithRef<"div"> {}

const CardFooter = ({className, ...props}: CardFooterProps) => {
  const {slots} = useContext(CardContext);

  return (
    <div
      className={composeSlotClassName(slots?.footer, className)}
      data-slot="card-footer"
      {...props}
    />
  );
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
