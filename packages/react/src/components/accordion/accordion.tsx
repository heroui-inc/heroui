"use client";

import type {AccordionVariants} from "./accordion.styles";
import type {Ref} from "react";
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
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";

import {accordionVariants} from "./accordion.styles";

const AccordionContext = createContext<{slots?: ReturnType<typeof accordionVariants>}>({});

/* -------------------------------------------------------------------------------------------------
 * Accordion
 * -----------------------------------------------------------------------------------------------*/

interface AccordionProps extends DisclosureGroupProps, AccordionVariants {
  ref?: Ref<HTMLDivElement>;
}

const Accordion = ({children, className, ref, variant, ...props}: AccordionProps) => {
  const slots = React.useMemo(() => accordionVariants({variant}), [variant]);

  return (
    <AccordionContext.Provider value={{slots}}>
      <DisclosureGroup
        ref={ref}
        data-accordion
        {...props}
        className={composeTwRenderProps(className, slots.base({variant}))}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DisclosureGroup>
    </AccordionContext.Provider>
  );
};

Accordion.displayName = "HeroUI.Accordion";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionItemProps extends DisclosureProps {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionItem = ({className, ref, ...props}: AccordionItemProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <Disclosure
      ref={ref}
      data-accordion-item
      {...props}
      className={composeTwRenderProps(className, slots?.item())}
    >
      {props.children}
    </Disclosure>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionIndicatorProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
}

const AccordionIndicator = ({children, className, ...props}: AccordionIndicatorProps) => {
  const {slots} = useContext(AccordionContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{className?: string; "data-accordion-indicator"?: boolean}>,
      {
        ...props,
        className: slots?.indicator({className}),
        "data-accordion-indicator": true,
      },
    );
  }

  return (
    <IconChevronDown
      data-accordion-indicator
      className={slots?.indicator({className})}
      {...props}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const AccordionHeading = ({className, ...props}: AccordionHeadingProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <DisclosureHeading data-accordion-heading className={slots?.heading({className})} {...props} />
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
}

const AccordionTrigger = ({className, ref, ...props}: AccordionTriggerProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <Button
      ref={ref}
      data-accordion-trigger
      className={composeTwRenderProps(className, slots?.trigger())}
      slot="trigger"
      {...props}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </Button>
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const AccordionBody = ({className, ...props}: AccordionBodyProps) => {
  const {slots} = useContext(AccordionContext);

  return <div data-accordion-body className={slots?.body({className})} {...props} />;
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionPanelProps extends DisclosurePanelProps {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionPanel = ({children, className, ref, ...props}: AccordionPanelProps) => {
  const {slots} = useContext(AccordionContext);

  return (
    <DisclosurePanel
      ref={ref}
      data-accordion-panel
      className={composeTwRenderProps(className, slots?.panel())}
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
};

/* -----------------------------------------------------------------------------------------------*/

const Root = Accordion;
const Item = AccordionItem;
const Heading = AccordionHeading;
const Trigger = AccordionTrigger;
const Panel = AccordionPanel;
const Indicator = AccordionIndicator;
const Body = AccordionBody;

export {Root, Item, Heading, Trigger, Panel, Indicator, Body};

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionPanelProps,
  AccordionIndicatorProps,
  AccordionBodyProps,
};
