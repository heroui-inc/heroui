"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {AccordionVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {accordionVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Button} from "react-aria-components/Button";
import {
  Disclosure,
  Heading as DisclosureHeading,
  DisclosurePanel,
  DisclosureStateContext,
} from "react-aria-components/Disclosure";
import {DisclosureGroup} from "react-aria-components/DisclosureGroup";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

const AccordionContext = createContext<{
  slots?: ReturnType<typeof accordionVariants>;
  hideSeparator?: boolean;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Accordion Root
 * -----------------------------------------------------------------------------------------------*/
interface AccordionRootProps
  extends ComponentPropsWithRef<typeof DisclosureGroup>, AccordionVariants {
  hideSeparator?: boolean;
}

const AccordionRoot = ({
  children,
  className,
  hideSeparator = false,
  variant,
  ...props
}: AccordionRootProps) => {
  const slots = React.useMemo(() => accordionVariants({variant}), [variant]);

  const content = (
    <DisclosureGroup
      className={composeTwRenderProps(className, slots.base())}
      data-slot="accordion"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </DisclosureGroup>
  );

  return (
    <AccordionContext value={{slots, hideSeparator}}>
      {variant === "surface" ? (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext value={{variant: "default"}}>{content}</SurfaceContext>
      ) : (
        content
      )}
    </AccordionContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/
interface AccordionItemProps extends ComponentPropsWithRef<typeof Disclosure> {}

const AccordionItem = ({className, ...props}: AccordionItemProps) => {
  const {hideSeparator, slots} = useContext(AccordionContext);

  return (
    <Disclosure
      className={composeTwRenderProps(className, slots?.item())}
      data-hide-separator={hideSeparator ? "true" : undefined}
      data-slot="accordion-item"
      {...props}
    >
      {props.children}
    </Disclosure>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionIndicator
 * -----------------------------------------------------------------------------------------------*/
interface AccordionIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AccordionIndicator = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: AccordionIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AccordionIndicatorProps<E>>) => {
  const {slots} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;

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
        className: composeSlotClassName(slots?.indicator, className),
        "data-slot": "accordion-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={composeSlotClassName(slots?.indicator, className)}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-indicator"
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionHeading
 * -----------------------------------------------------------------------------------------------*/
interface AccordionHeadingProps extends ComponentPropsWithRef<typeof DisclosureHeading> {
  className?: string;
}

const AccordionHeading = ({className, ...props}: AccordionHeadingProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <DisclosureHeading
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="accordion-heading"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/
interface AccordionTriggerProps extends ComponentPropsWithRef<typeof Button> {}

const AccordionTrigger = ({className, ...props}: AccordionTriggerProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="accordion-trigger"
      slot="trigger"
      {...props}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionBody
 * -----------------------------------------------------------------------------------------------*/
interface AccordionBodyProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const AccordionBody = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: AccordionBodyProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof AccordionBodyProps<E>>) => {
  const {slots} = useContext(AccordionContext);

  return (
    <dom.div className={slots?.body({})} data-slot="accordion-body" {...(props as any)}>
      <div className={composeSlotClassName(slots?.bodyInner, className)}>{children}</div>
    </dom.div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionPanel
 * -----------------------------------------------------------------------------------------------*/
interface AccordionPanelProps extends ComponentPropsWithRef<typeof DisclosurePanel> {}

const AccordionPanel = ({children, className, ...props}: AccordionPanelProps) => {
  const {slots} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;

  return (
    <DisclosurePanel
      className={composeTwRenderProps(className, slots?.panel())}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-panel"
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
};

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
