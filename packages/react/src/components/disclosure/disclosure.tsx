"use client";

import type {DisclosureVariants} from "./disclosure.styles";
import type {Booleanish} from "../../utils/assertion";
import type {
  ButtonProps,
  DisclosurePanelProps,
  DisclosureProps as DisclosurePrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext, useRef} from "react";
import {
  Button,
  Heading as DisclosureHeadingPrimitive,
  DisclosurePanel,
  Disclosure as DisclosurePrimitive,
  DisclosureStateContext,
} from "react-aria-components";

import {mapPropsVariants, objectToDeps} from "../../utils";
import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";

import {disclosureVariants} from "./disclosure.styles";

const DisclosureContext = createContext<{
  slots?: ReturnType<typeof disclosureVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure Root
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureRootProps extends DisclosurePrimitiveProps, DisclosureVariants {}

const DisclosureRoot = ({children, className, ...originalProps}: DisclosureRootProps) => {
  const [props, variantProps] = mapPropsVariants(originalProps, disclosureVariants.variantKeys);

  const slots = React.useMemo(
    () => disclosureVariants({...(variantProps as DisclosureVariants)}),
    [objectToDeps(variantProps)],
  );

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
 * DisclosureHeading
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureHeadingProps extends React.ComponentProps<typeof DisclosureHeadingPrimitive> {
  className?: string;
}

const DisclosureHeading = ({className, ...props}: DisclosureHeadingProps) => {
  const {slots} = useContext(DisclosureContext);

  return (
    <DisclosureHeadingPrimitive
      className={slots?.heading({className})}
      data-slot="disclosure-heading"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * DisclosureTrigger
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
 * DisclosureContent
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureContentProps extends DisclosurePanelProps {}

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
 * DisclosureBody
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureBodyContentProps extends React.ComponentProps<"div"> {
  className?: string;
}

const DisclosureBody = ({children, className, ...props}: DisclosureBodyContentProps) => {
  const {slots} = useContext(DisclosureContext);

  return (
    <div className={slots?.body({})} data-slot="disclosure-body" {...props}>
      <div className={slots?.bodyInner({className})}>{children}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DisclosureIndicator
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureIndicatorProps extends React.ComponentProps<"svg"> {
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
        className: slots?.indicator({className}),
        "data-slot": "disclosure-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={slots?.indicator({className})}
      data-expanded={dataAttr(isExpanded)}
      data-slot="disclosure-indicator"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export type {
  DisclosureRootProps,
  DisclosureContentProps,
  DisclosureHeadingProps,
  DisclosureTriggerProps,
  DisclosureIndicatorProps,
  DisclosureBodyContentProps,
};

export {
  DisclosureRoot,
  DisclosureHeading,
  DisclosureTrigger,
  DisclosureContent,
  DisclosureBody,
  DisclosureIndicator,
};
