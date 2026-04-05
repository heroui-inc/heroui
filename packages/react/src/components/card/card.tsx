"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {CardVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {cardVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";

import {composeSlotClassName} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {SurfaceContext} from "../surface";

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
interface CardRootProps<E extends keyof React.JSX.IntrinsicElements = "div"> extends DOMRenderProps<
  E,
  undefined
> {
  children: ReactNode;
  className?: string;
  /** Visual variant. @default "default" */
  variant?: CardVariants["variant"];
}

const CardRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant = "default",
  ...props
}: CardRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardRootProps<E>>) => {
  const slots = React.useMemo(() => cardVariants({variant}), [variant]);

  const content = (
    <dom.div className={slots.base({className})} data-slot="card" {...(props as any)}>
      {children}
    </dom.div>
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
