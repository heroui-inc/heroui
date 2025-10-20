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

import {accordionVariants} from "./accordion.styles";

const AccordionContext = createContext<{slots?: ReturnType<typeof accordionVariants>}>({});

/* -------------------------------------------------------------------------------------------------
 * Accordion
 * -----------------------------------------------------------------------------------------------*/

interface AccordionProps extends DisclosureGroupProps, AccordionVariants {}

const Accordion = React.forwardRef<React.ComponentRef<typeof DisclosureGroup>, AccordionProps>(
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
          data-slot="accordion"
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

/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/

interface AccordionItemProps extends DisclosureProps {}

const AccordionItem = React.forwardRef<React.ComponentRef<typeof Disclosure>, AccordionItemProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(AccordionContext);

    return (
      <Disclosure
        ref={ref}
        data-slot="accordion-item"
        {...props}
        className={composeTwRenderProps(className, slots?.item())}
      >
        {props.children}
      </Disclosure>
    );
  },
);

AccordionItem.displayName = "HeroUI.AccordionItem";

/* -------------------------------------------------------------------------------------------------
 * AccordionIndicator
 * -----------------------------------------------------------------------------------------------*/

interface AccordionIndicatorProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
}

const AccordionIndicator = React.forwardRef<
  React.ComponentRef<typeof IconChevronDown>,
  AccordionIndicatorProps
>(({children, className, ...props}, ref) => {
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
      ref={ref}
      className={slots?.indicator({className})}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-indicator"
      {...props}
    />
  );
});

AccordionIndicator.displayName = "HeroUI.AccordionIndicator";

/* -------------------------------------------------------------------------------------------------
 * AccordionHeading
 * -----------------------------------------------------------------------------------------------*/

interface AccordionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const AccordionHeading = React.forwardRef<
  React.ComponentRef<typeof DisclosureHeading>,
  AccordionHeadingProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(AccordionContext);

  return (
    <DisclosureHeading
      ref={ref}
      className={slots?.heading({className})}
      data-slot="accordion-heading"
      {...props}
    />
  );
});

AccordionHeading.displayName = "HeroUI.AccordionHeading";

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/

interface AccordionTriggerProps extends ButtonProps {}

const AccordionTrigger = React.forwardRef<React.ComponentRef<typeof Button>, AccordionTriggerProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(AccordionContext);

    return (
      <Button
        ref={ref}
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
  },
);

AccordionTrigger.displayName = "HeroUI.AccordionTrigger";

/* -------------------------------------------------------------------------------------------------
 * AccordionBody
 * -----------------------------------------------------------------------------------------------*/

interface AccordionBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionBody = React.forwardRef<React.ComponentRef<"div">, AccordionBodyProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(AccordionContext);

    return (
      <div ref={ref} className={slots?.body({})} data-slot="accordion-body" {...props}>
        <div className={slots?.bodyInner({className})}>{children}</div>
      </div>
    );
  },
);

AccordionBody.displayName = "HeroUI.AccordionBody";

/* -------------------------------------------------------------------------------------------------
 * AccordionPanel
 * -----------------------------------------------------------------------------------------------*/

interface AccordionPanelProps extends DisclosurePanelProps {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionPanel = React.forwardRef<
  React.ComponentRef<typeof DisclosurePanel>,
  AccordionPanelProps
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(AccordionContext);
  const {isExpanded} = useContext(DisclosureStateContext)!;

  return (
    <DisclosurePanel
      {...props}
      ref={ref}
      className={composeTwRenderProps(className, slots?.panel())}
      data-expanded={dataAttr(isExpanded)}
      data-slot="accordion-panel"
    >
      {children}
    </DisclosurePanel>
  );
});

AccordionPanel.displayName = "HeroUI.AccordionPanel";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionPanelProps,
  AccordionIndicatorProps,
  AccordionBodyProps,
  AccordionHeadingProps,
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionIndicator,
  AccordionBody,
  AccordionHeading,
};
