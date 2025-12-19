"use client";

import type {DisclosureVariants} from "./disclosure.styles";
import type {Booleanish} from "../../utils/assertion";
import type {ComponentPropsWithRef} from "react";
import type {ButtonProps} from "react-aria-components";

import React, {createContext, useContext, useRef} from "react";
import {
  Button,
  Heading as DisclosureHeadingPrimitive,
  DisclosurePanel,
  Disclosure as DisclosurePrimitive,
  DisclosureStateContext,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";

import {disclosureVariants} from "./disclosure.styles";

/* ------------------------------------------------------------------------------------------------
 * Disclosure Context
 * --------------------------------------------------------------------------------------------- */
type DisclosureContext = {
  slots?: ReturnType<typeof disclosureVariants>;
};

const DisclosureContext = createContext<DisclosureContext>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Root
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureRootProps
  extends ComponentPropsWithRef<typeof DisclosurePrimitive>, DisclosureVariants {}

const DisclosureRoot = ({children, className, ...props}: DisclosureRootProps) => {
  const slots = React.useMemo(() => disclosureVariants({}), []);

  return (
    <DisclosureContext value={{slots}}>
      <DisclosurePrimitive
        data-slot="disclosure"
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DisclosurePrimitive>
    </DisclosureContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Disclosure Heading
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureHeadingProps extends ComponentPropsWithRef<typeof DisclosureHeadingPrimitive> {
  className?: string;
}

const DisclosureHeading = ({className, ...props}: DisclosureHeadingProps) => {
  const {slots} = useContext(DisclosureContext);

  return (
    <DisclosureHeadingPrimitive
      className={composeSlotClassName(slots?.heading, className)}
      data-slot="disclosure-heading"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Disclosure Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureTriggerProps extends ButtonProps {}

const DisclosureTrigger = ({className, ...props}: DisclosureTriggerProps) => {
  const {slots} = useContext(DisclosureContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="disclosure-trigger"
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
 * Disclosure Content
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureContentProps extends ComponentPropsWithRef<typeof DisclosurePanel> {}

const DisclosureContent = ({children, className, ...props}: DisclosureContentProps) => {
  const {slots} = useContext(DisclosureContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const {isExpanded} = useContext(DisclosureStateContext)!;

  return (
    <DisclosurePanel
      ref={contentRef}
      className={composeTwRenderProps(className, slots?.content())}
      data-expanded={dataAttr(isExpanded)}
      data-slot="disclosure-content"
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Disclosure Body
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureBodyContentProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const DisclosureBody = ({children, className, ...props}: DisclosureBodyContentProps) => {
  const {slots} = useContext(DisclosureContext);

  return (
    <div className={slots?.body({})} data-slot="disclosure-body" {...props}>
      <div className={composeSlotClassName(slots?.bodyInner, className)}>{children}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Disclosure Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DisclosureIndicatorProps extends ComponentPropsWithRef<"svg"> {
  className?: string;
}

const DisclosureIndicator = ({children, className, ...props}: DisclosureIndicatorProps) => {
  const {isExpanded} = useContext(DisclosureStateContext)!;
  const {slots} = useContext(DisclosureContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "disclosure-indicator";
        "data-expanded"?: Booleanish;
      }>,
      {
        ...props,
        "data-expanded": dataAttr(isExpanded),
        className: composeSlotClassName(slots?.indicator, className),
        "data-slot": "disclosure-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={composeSlotClassName(slots?.indicator, className)}
      data-expanded={dataAttr(isExpanded)}
      data-slot="disclosure-indicator"
      {...props}
    />
  );
};

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
