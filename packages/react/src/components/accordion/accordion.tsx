"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {AccordionVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {accordionVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Button} from "react-aria-components/Button";
import {
  Disclosure,
  Heading as DisclosureHeading,
  DisclosurePanel,
  DisclosureStateContext,
} from "react-aria-components/Disclosure";
import {DisclosureGroup} from "react-aria-components/DisclosureGroup";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronDown} from "../icons";
import {SurfaceContext, defaultSurfaceContextValue} from "../surface";

type AccordionContext = {
  bodyClassName?: string;
  bodyInnerClassName?: string;
  headingClassName?: string;
  hideSeparator?: boolean;
  indicatorClassName?: string;
  itemClassName?: string;
  panelClassName?: string;
  triggerClassName?: string;
};

const AccordionContext = createContext<AccordionContext>({});

/* -------------------------------------------------------------------------------------------------
 * Accordion Root
 * -----------------------------------------------------------------------------------------------*/
interface AccordionRootProps
  extends ComponentPropsWithRef<typeof DisclosureGroup>, AccordionVariants {
  hideSeparator?: boolean;
}

const AccordionRoot = memo(function AccordionRoot({
  children,
  className,
  hideSeparator = false,
  variant,
  ...props
}: AccordionRootProps) {
  const slots = useMemo(() => accordionVariants({variant}), [variant]);
  const contextValue = useMemo<AccordionContext>(
    () => ({
      bodyClassName: slots.body(),
      bodyInnerClassName: slots.bodyInner(),
      headingClassName: slots.heading(),
      hideSeparator,
      indicatorClassName: slots.indicator(),
      itemClassName: slots.item(),
      panelClassName: slots.panel(),
      triggerClassName: slots.trigger(),
    }),
    [slots, hideSeparator],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  const content = (
    <DisclosureGroup
      className={composeTwRenderProps(className, baseClassName)}
      data-slot="accordion"
      {...props}
    >
      {typeof children === "function" ? (values) => children(values) : children}
    </DisclosureGroup>
  );

  return (
    <AccordionContext value={contextValue}>
      {variant === "surface" ? (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext value={defaultSurfaceContextValue}>{content}</SurfaceContext>
      ) : (
        content
      )}
    </AccordionContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/
interface AccordionItemProps extends ComponentPropsWithRef<typeof Disclosure> {}

const AccordionItem = memo(function AccordionItem({className, ...props}: AccordionItemProps) {
  const {hideSeparator, itemClassName} = useContext(AccordionContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, itemClassName) as string,
    [className, itemClassName],
  );

  return (
    <Disclosure
      className={resolvedClassName}
      data-hide-separator={hideSeparator ? "true" : undefined}
      data-slot="accordion-item"
      {...props}
    >
      {props.children}
    </Disclosure>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AccordionIndicator
 * -----------------------------------------------------------------------------------------------*/
interface AccordionIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function AccordionIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: AccordionIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AccordionIndicatorProps<E>>) {
  const {indicatorClassName} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, indicatorClassName) as string,
    [className, indicatorClassName],
  );

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "accordion-indicator";
        "data-expanded"?: Booleanish;
      }>,
      {
        ...(props as any),
        "data-expanded": dataAttr(isExpanded),
        className: resolvedClassName,
        "data-slot": "accordion-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={resolvedClassName}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-indicator"
      {...(props as any)}
    />
  );
}

const AccordionIndicator = memo(AccordionIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "svg",
>(
  props: AccordionIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof AccordionIndicatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * AccordionHeading
 * -----------------------------------------------------------------------------------------------*/
interface AccordionHeadingProps extends ComponentPropsWithRef<typeof DisclosureHeading> {
  className?: string;
}

const AccordionHeading = memo(function AccordionHeading({
  className,
  ...props
}: AccordionHeadingProps) {
  const {headingClassName} = useContext(AccordionContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <DisclosureHeading className={resolvedClassName} data-slot="accordion-heading" {...props} />
  );
});

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/
interface AccordionTriggerProps extends ComponentPropsWithRef<typeof Button> {}

const AccordionTrigger = memo(function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const {triggerClassName} = useContext(AccordionContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName) as string,
    [className, triggerClassName],
  );

  return (
    <Button className={resolvedClassName} data-slot="accordion-trigger" slot="trigger" {...props}>
      {typeof children === "function" ? (values) => children(values) : children}
    </Button>
  );
});

/* -------------------------------------------------------------------------------------------------
 * AccordionBody
 * -----------------------------------------------------------------------------------------------*/
interface AccordionBodyProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function AccordionBodyInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: AccordionBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AccordionBodyProps<E>>) {
  const {bodyClassName, bodyInnerClassName} = useContext(AccordionContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, bodyInnerClassName) as string,
    [className, bodyInnerClassName],
  );

  return (
    <dom.div className={bodyClassName} data-slot="accordion-body" {...(props as any)}>
      <div className={resolvedClassName}>{children}</div>
    </dom.div>
  );
}

const AccordionBody = memo(AccordionBodyInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: AccordionBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AccordionBodyProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * AccordionPanel
 * -----------------------------------------------------------------------------------------------*/
interface AccordionPanelProps extends ComponentPropsWithRef<typeof DisclosurePanel> {}

const AccordionPanel = memo(function AccordionPanel({
  children,
  className,
  ...props
}: AccordionPanelProps) {
  const {panelClassName} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, panelClassName) as string,
    [className, panelClassName],
  );

  return (
    <DisclosurePanel
      className={resolvedClassName}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-panel"
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionIndicator,
  AccordionBody,
  AccordionHeading,
};

export type {
  AccordionRootProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionPanelProps,
  AccordionIndicatorProps,
  AccordionBodyProps,
  AccordionHeadingProps,
};
