"use client";

import type {AccordionVariants} from "./accordion.styles";
import type {Booleanish} from "../../utils/assertion";
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  Heading as DisclosureHeading,
  DisclosurePanel,
  DisclosureStateContext,
} from "react-aria-components";

import {mapPropsVariants, objectToDeps} from "../../utils";
import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

import {accordionVariants} from "./accordion.styles";

const AccordionContext = createContext<{slots?: ReturnType<typeof accordionVariants>}>({});

/* -------------------------------------------------------------------------------------------------
 * Accordion Root
 * -----------------------------------------------------------------------------------------------*/
interface AccordionRootProps extends DisclosureGroupProps, AccordionVariants {}

const AccordionRoot = ({children, className, ...originalProps}: AccordionRootProps) => {
  const [props, variantProps] = mapPropsVariants(originalProps, accordionVariants.variantKeys);

  const slots = React.useMemo(
    () => accordionVariants({...(variantProps as AccordionVariants)}),
    [objectToDeps(variantProps)],
  );

  const variant = (variantProps as AccordionVariants)?.variant ?? "default";

  const content = (
    <DisclosureGroup
      data-slot="accordion"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </DisclosureGroup>
  );

  return (
    <AccordionContext value={{slots}}>
      {variant === "elevated" ? (
        // Allows inner components to apply "on-surface" colors for proper contrast
        <SurfaceContext.Provider value={{variant: "default"}}>{content}</SurfaceContext.Provider>
      ) : (
        content
      )}
    </AccordionContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/
interface AccordionItemProps extends DisclosureProps {}

const AccordionItem = ({className, ...props}: AccordionItemProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <Disclosure
      data-slot="accordion-item"
      {...props}
      className={composeTwRenderProps(className, slots?.item())}
    >
      {props.children}
    </Disclosure>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionIndicator
 * -----------------------------------------------------------------------------------------------*/
interface AccordionIndicatorProps extends React.ComponentProps<"svg"> {
  className?: string;
}

const AccordionIndicator = ({children, className, ...props}: AccordionIndicatorProps) => {
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
        ...props,
        "data-expanded": dataAttr(isExpanded),
        className: slots?.indicator({className}),
        "data-slot": "accordion-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={slots?.indicator({className})}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-indicator"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionHeading
 * -----------------------------------------------------------------------------------------------*/
interface AccordionHeadingProps extends React.ComponentProps<typeof DisclosureHeading> {
  className?: string;
}

const AccordionHeading = ({className, ...props}: AccordionHeadingProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <DisclosureHeading
      className={slots?.heading({className})}
      data-slot="accordion-heading"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/
interface AccordionTriggerProps extends ButtonProps {}

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
interface AccordionBodyProps extends React.ComponentProps<"div"> {
  className?: string;
}

const AccordionBody = ({children, className, ...props}: AccordionBodyProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <div className={slots?.body({})} data-slot="accordion-body" {...props}>
      <div className={slots?.bodyInner({className})}>{children}</div>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AccordionPanel
 * -----------------------------------------------------------------------------------------------*/
interface AccordionPanelProps extends DisclosurePanelProps {}

const AccordionPanel = ({children, className, ...props}: AccordionPanelProps) => {
  const {slots} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;

  return (
    <DisclosurePanel
      {...props}
      className={composeTwRenderProps(className, slots?.panel())}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-panel"
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
