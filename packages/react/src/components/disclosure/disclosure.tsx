"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {DisclosureVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ButtonProps} from "react-aria-components/Button";

import {disclosureVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo, useRef} from "react";
import {Button} from "react-aria-components/Button";
import {
  DisclosurePanel,
  Disclosure as DisclosurePrimitive,
  DisclosureStateContext,
} from "react-aria-components/Disclosure";
import {Heading as DisclosureHeadingPrimitive} from "react-aria-components/Heading";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronDown} from "../icons";

/* ------------------------------------------------------------------------------------------------
 * Disclosure Context
 * --------------------------------------------------------------------------------------------- */
type DisclosureContext = {
  bodyClassName?: string;
  bodyInnerClassName?: string;
  contentClassName?: string;
  headingClassName?: string;
  indicatorClassName?: string;
  triggerClassName?: string;
};

const DisclosureContext = createContext<DisclosureContext>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Root
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureRootProps
  extends ComponentPropsWithRef<typeof DisclosurePrimitive>, DisclosureVariants {}

const DisclosureRoot = memo(function DisclosureRoot({
  children,
  className,
  ...props
}: DisclosureRootProps) {
  const slots = useMemo(() => disclosureVariants({}), []);
  const contextValue = useMemo<DisclosureContext>(
    () => ({
      bodyClassName: slots.body(),
      bodyInnerClassName: slots.bodyInner(),
      contentClassName: slots.content(),
      headingClassName: slots.heading(),
      indicatorClassName: slots.indicator(),
      triggerClassName: slots.trigger(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <DisclosureContext value={contextValue}>
      <DisclosurePrimitive
        data-slot="disclosure"
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </DisclosurePrimitive>
    </DisclosureContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Heading
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureHeadingProps extends ComponentPropsWithRef<typeof DisclosureHeadingPrimitive> {
  className?: string;
}

const DisclosureHeading = memo(function DisclosureHeading({
  className,
  ...props
}: DisclosureHeadingProps) {
  const {headingClassName} = useContext(DisclosureContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <DisclosureHeadingPrimitive
      className={resolvedClassName}
      data-slot="disclosure-heading"
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureTriggerProps extends ButtonProps {}

const DisclosureTrigger = memo(function DisclosureTrigger({
  children,
  className,
  ...props
}: DisclosureTriggerProps) {
  const {triggerClassName} = useContext(DisclosureContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName) as string,
    [className, triggerClassName],
  );

  return (
    <Button className={resolvedClassName} data-slot="disclosure-trigger" slot="trigger" {...props}>
      {typeof children === "function" ? (values) => children(values) : children}
    </Button>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Content
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureContentProps extends ComponentPropsWithRef<typeof DisclosurePanel> {}

const DisclosureContent = memo(function DisclosureContent({
  children,
  className,
  ...props
}: DisclosureContentProps) {
  const {contentClassName} = useContext(DisclosureContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const {isExpanded} = useContext(DisclosureStateContext)!;
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contentClassName) as string,
    [className, contentClassName],
  );

  return (
    <DisclosurePanel
      ref={contentRef}
      className={resolvedClassName}
      data-expanded={dataAttr(isExpanded)}
      data-slot="disclosure-content"
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Body
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureBodyContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function DisclosureBodyInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: DisclosureBodyContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DisclosureBodyContentProps<E>>) {
  const {bodyClassName, bodyInnerClassName} = useContext(DisclosureContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, bodyInnerClassName) as string,
    [className, bodyInnerClassName],
  );

  return (
    <dom.div className={bodyClassName} data-slot="disclosure-body" {...(props as any)}>
      <div className={resolvedClassName}>{children}</div>
    </dom.div>
  );
}

const DisclosureBody = memo(DisclosureBodyInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: DisclosureBodyContentProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof DisclosureBodyContentProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Disclosure Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function DisclosureIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: DisclosureIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DisclosureIndicatorProps<E>>) {
  const {isExpanded} = useContext(DisclosureStateContext)!;
  const {indicatorClassName} = useContext(DisclosureContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, indicatorClassName) as string,
    [className, indicatorClassName],
  );

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "disclosure-indicator";
        "data-expanded"?: Booleanish;
      }>,
      {
        ...(props as any),
        "data-expanded": dataAttr(isExpanded),
        className: resolvedClassName,
        "data-slot": "disclosure-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={resolvedClassName}
      data-expanded={dataAttr(isExpanded)}
      data-slot="disclosure-indicator"
      {...(props as any)}
    />
  );
}

const DisclosureIndicator = memo(DisclosureIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "svg",
>(
  props: DisclosureIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof DisclosureIndicatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DisclosureRoot,
  DisclosureHeading,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureBody,
  DisclosureIndicator,
};

export type {
  DisclosureRootProps,
  DisclosureContentProps,
  DisclosureHeadingProps,
  DisclosureTriggerProps,
  DisclosureIndicatorProps,
  DisclosureBodyContentProps,
};
