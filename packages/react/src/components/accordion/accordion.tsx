"use client";

import type {AccordionVariants} from "./accordion.styles";
import type {Booleanish} from "../../utils/assertion";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  Heading as DisclosureHeading,
  DisclosurePanel,
  DisclosureStateContext,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

import {accordionVariants} from "./accordion.styles";

const AccordionContext = createContext<{slots?: ReturnType<typeof accordionVariants>}>({});

/* -------------------------------------------------------------------------------------------------
 * Accordion Root
 * -----------------------------------------------------------------------------------------------*/
interface AccordionRootProps
  extends ComponentPropsWithRef<typeof DisclosureGroup>, AccordionVariants {}

const AccordionRoot = ({children, className, variant, ...props}: AccordionRootProps) => {
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
    <AccordionContext value={{slots}}>
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
  const {slots} = useContext(AccordionContext);

  return (
    <Disclosure
      className={composeTwRenderProps(className, slots?.item())}
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
interface AccordionIndicatorProps extends ComponentPropsWithRef<"svg"> {
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
      {...props}
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
interface AccordionBodyProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const AccordionBody = ({children, className, ...props}: AccordionBodyProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <div className={slots?.body({})} data-slot="accordion-body" {...props}>
      <div className={composeSlotClassName(slots?.bodyInner, className)}>{children}</div>
    </div>
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
