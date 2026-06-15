"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {CardVariants} from "@heroui/styles";
import type {ReactNode} from "react";

import {cardVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Card Context
 * -----------------------------------------------------------------------------------------------*/
interface CardContext {
  contentClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
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

function CardRootInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant = "default",
  ...props
}: CardRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardRootProps<E>>) {
  const slots = useMemo(() => cardVariants({variant}), [variant]);
  const contextValue = useMemo<CardContext>(
    () => ({
      contentClassName: slots.content(),
      descriptionClassName: slots.description(),
      footerClassName: slots.footer(),
      headerClassName: slots.header(),
      titleClassName: slots.title(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  const content = (
    <dom.div className={resolvedClassName} data-slot="card" {...(props as any)}>
      {children}
    </dom.div>
  );

  return (
    <CardContext value={contextValue}>
      {variant === "transparent" ? (
        content
      ) : (
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
}

const CardRoot = memo(CardRootInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: CardRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardRootProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Card Header
 * -----------------------------------------------------------------------------------------------*/
interface CardHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardHeaderInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardHeaderProps<E>>) {
  const {headerClassName} = useContext(CardContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerClassName) as string,
    [className, headerClassName],
  );

  return <dom.div className={resolvedClassName} data-slot="card-header" {...(props as any)} />;
}

const CardHeader = memo(CardHeaderInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: CardHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardHeaderProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Card Title
 * -----------------------------------------------------------------------------------------------*/
interface CardTitleProps<E extends keyof React.JSX.IntrinsicElements = "h3"> extends DOMRenderProps<
  E,
  undefined
> {
  children?: ReactNode;
  className?: string;
}

function CardTitleInner<E extends keyof React.JSX.IntrinsicElements = "h3">({
  children,
  className,
  ...props
}: CardTitleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardTitleProps<E>>) {
  const {titleClassName} = useContext(CardContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, titleClassName) as string,
    [className, titleClassName],
  );

  return (
    <dom.h3 className={resolvedClassName} data-slot="card-title" {...(props as any)}>
      {children}
    </dom.h3>
  );
}

const CardTitle = memo(CardTitleInner) as <E extends keyof React.JSX.IntrinsicElements = "h3">(
  props: CardTitleProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardTitleProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Card Description
 * -----------------------------------------------------------------------------------------------*/
interface CardDescriptionProps<
  E extends keyof React.JSX.IntrinsicElements = "p",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardDescriptionInner<E extends keyof React.JSX.IntrinsicElements = "p">({
  children,
  className,
  ...props
}: CardDescriptionProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardDescriptionProps<E>>) {
  const {descriptionClassName} = useContext(CardContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, descriptionClassName) as string,
    [className, descriptionClassName],
  );

  return (
    <dom.p className={resolvedClassName} data-slot="card-description" {...(props as any)}>
      {children}
    </dom.p>
  );
}

const CardDescription = memo(CardDescriptionInner) as <
  E extends keyof React.JSX.IntrinsicElements = "p",
>(
  props: CardDescriptionProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof CardDescriptionProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Card Content
 * -----------------------------------------------------------------------------------------------*/
interface CardContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardContentInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardContentProps<E>>) {
  const {contentClassName} = useContext(CardContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contentClassName) as string,
    [className, contentClassName],
  );

  return <dom.div className={resolvedClassName} data-slot="card-content" {...(props as any)} />;
}

const CardContent = memo(CardContentInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: CardContentProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardContentProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Card Footer
 * -----------------------------------------------------------------------------------------------*/
interface CardFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CardFooterInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: CardFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardFooterProps<E>>) {
  const {footerClassName} = useContext(CardContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, footerClassName) as string,
    [className, footerClassName],
  );

  return <dom.div className={resolvedClassName} data-slot="card-footer" {...(props as any)} />;
}

const CardFooter = memo(CardFooterInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: CardFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CardFooterProps<E>>,
) => React.JSX.Element;

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
