"use client";

import type {AccordionVariants} from "./accordion.styles";
import type {Booleanish} from "../../utils/assertion";
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components";

import React, {createContext, useContext, useRef} from "react";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  Heading as DisclosureHeading,
  DisclosurePanel,
  DisclosureStateContext,
} from "react-aria-components";

import {usePreventHidden} from "../../hooks";
import {mapPropsVariants, objectToDeps, useMergeRef} from "../../utils";
import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";

import {accordionVariants} from "./accordion.styles";

const AccordionContext = createContext<{slots?: ReturnType<typeof accordionVariants>}>({});

/* -------------------------------------------------------------------------------------------------
 * Accordion
 * -----------------------------------------------------------------------------------------------*/

interface AccordionProps extends DisclosureGroupProps, AccordionVariants {}

const Accordion = React.forwardRef<React.ElementRef<typeof DisclosureGroup>, AccordionProps>(
  ({children, className, ...originalProps}, ref) => {
    const [props, variantProps] = mapPropsVariants(originalProps, accordionVariants.variantKeys);

    const slots = React.useMemo(
      () => accordionVariants({...(variantProps as AccordionVariants)}),
      [objectToDeps(variantProps)],
    );

    return (
      <AccordionContext.Provider value={{slots}}>
        <DisclosureGroup
          ref={ref}
          data-accordion
          {...props}
          className={composeTwRenderProps(className, slots.base())}
        >
          {(values) => <>{typeof children === "function" ? children(values) : children}</>}
        </DisclosureGroup>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = "HeroUI.Accordion";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionItemProps extends DisclosureProps {}

const AccordionItem = React.forwardRef<React.ElementRef<typeof Disclosure>, AccordionItemProps>(
  ({className, ...props}, ref) => {
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
  },
);

AccordionItem.displayName = "HeroUI.AccordionItem";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionIndicatorProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
}

const AccordionIndicator = React.forwardRef<
  React.ElementRef<typeof IconChevronDown>,
  AccordionIndicatorProps
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-accordion-indicator"?: boolean;
        "data-expanded"?: Booleanish;
      }>,
      {
        ...props,
        "data-expanded": dataAttr(isExpanded),
        className: slots?.indicator({className}),
        "data-accordion-indicator": true,
      },
    );
  }

  return (
    <IconChevronDown
      ref={ref}
      data-accordion-indicator
      className={slots?.indicator({className})}
      data-expanded={dataAttr(isExpanded)}
      {...props}
    />
  );
});

AccordionIndicator.displayName = "HeroUI.AccordionIndicator";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const AccordionHeading = React.forwardRef<
  React.ElementRef<typeof DisclosureHeading>,
  AccordionHeadingProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(AccordionContext);

  return (
    <DisclosureHeading
      ref={ref}
      data-accordion-heading
      className={slots?.heading({className})}
      {...props}
    />
  );
});

AccordionHeading.displayName = "HeroUI.AccordionHeading";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionTriggerProps extends ButtonProps {}

const AccordionTrigger = React.forwardRef<React.ElementRef<typeof Button>, AccordionTriggerProps>(
  ({className, ...props}, ref) => {
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
  },
);

AccordionTrigger.displayName = "HeroUI.AccordionTrigger";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionBody = React.forwardRef<React.ElementRef<"div">, AccordionBodyProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(AccordionContext);

    return (
      <div ref={ref} data-accordion-body className={slots?.body({})} {...props}>
        <div className={slots?.bodyInner({className})}>{children}</div>
      </div>
    );
  },
);

AccordionBody.displayName = "HeroUI.AccordionBody";

/* -----------------------------------------------------------------------------------------------*/

interface AccordionPanelProps extends DisclosurePanelProps {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionPanel = React.forwardRef<
  React.ElementRef<typeof DisclosurePanel>,
  AccordionPanelProps
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;
  const contentRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRef(contentRef, ref);

  // Prevent React Aria from setting hidden="until-found" which breaks animations
  usePreventHidden(contentRef);

  return (
    <DisclosurePanel
      {...props}
      ref={mergedRef}
      data-accordion-panel
      className={composeTwRenderProps(className, slots?.panel())}
      data-expanded={dataAttr(isExpanded)}
    >
      {children}
    </DisclosurePanel>
  );
});

AccordionPanel.displayName = "HeroUI.AccordionPanel";

/* -----------------------------------------------------------------------------------------------*/

const CompoundAccordion = Object.assign(Accordion, {
  Item: AccordionItem,
  Heading: AccordionHeading,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
  Indicator: AccordionIndicator,
  Body: AccordionBody,
});

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionPanelProps,
  AccordionIndicatorProps,
  AccordionBodyProps,
};

export default CompoundAccordion;
