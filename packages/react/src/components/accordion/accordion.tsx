"use client";

import type {AccordionVariants} from "./accordion.styles";
import type {Ref} from "react";
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components";

import React from "react";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  Heading as DisclosureHeading,
  DisclosurePanel,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";

import {slots} from "./accordion.styles";

/* -------------------------------------------------------------------------------------------------
 * Accordion
 * -----------------------------------------------------------------------------------------------*/

interface AccordionProps extends DisclosureGroupProps, AccordionVariants {
  ref?: Ref<HTMLDivElement>;
}

const Accordion = ({children, className, ref, variant, ...props}: AccordionProps) => {
  return (
    <DisclosureGroup
      ref={ref}
      data-slot="accordion"
      {...props}
      className={composeTwRenderProps(className, slots.base({variant}))}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </DisclosureGroup>
  );
};

Accordion.displayName = "HeroUI.Accordion";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionItemProps extends DisclosureProps {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionItem = ({className, ref, ...props}: AccordionItemProps) => {
  return (
    <Disclosure
      ref={ref}
      data-slot="accordion-item"
      {...props}
      className={composeTwRenderProps(className, slots.item())}
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
  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{className?: string; "data-slot"?: string}>,
      {
        ...props,
        className: slots.indicator({className}),
        "data-slot": "accordion-indicator",
      },
    );
  }

  return (
    <IconChevronDown
      className={slots.indicator({className})}
      data-slot="accordion-indicator"
      {...props}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const AccordionHeading = ({className, ...props}: AccordionHeadingProps) => {
  return (
    <DisclosureHeading
      className={slots.heading({className})}
      data-slot="accordion-heading"
      {...props}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
}

const AccordionTrigger = ({className, ref, ...props}: AccordionTriggerProps) => {
  return (
    <Button
      ref={ref}
      className={composeTwRenderProps(className, slots.trigger())}
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

/* -----------------------------------------------------------------------------------------------*/

interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const AccordionBody = ({className, ...props}: AccordionBodyProps) => {
  return <div className={slots.body({className})} data-slot="accordion-body" {...props} />;
};

/* -----------------------------------------------------------------------------------------------*/

interface AccordionPanelProps extends DisclosurePanelProps {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionPanel = ({children, className, ref, ...props}: AccordionPanelProps) => {
  return (
    <DisclosurePanel
      ref={ref}
      className={composeTwRenderProps(className, slots.content())}
      data-slot="accordion-content"
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
