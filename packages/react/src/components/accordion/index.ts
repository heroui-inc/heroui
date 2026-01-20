import type {ComponentProps} from "react";

import {
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "./accordion";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Heading: AccordionHeading,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
  Indicator: AccordionIndicator,
  Body: AccordionBody,
});

export type Accordion = {
  Props: ComponentProps<typeof AccordionRoot>;
  RootProps: ComponentProps<typeof AccordionRoot>;
  ItemProps: ComponentProps<typeof AccordionItem>;
  HeadingProps: ComponentProps<typeof AccordionHeading>;
  TriggerProps: ComponentProps<typeof AccordionTrigger>;
  PanelProps: ComponentProps<typeof AccordionPanel>;
  IndicatorProps: ComponentProps<typeof AccordionIndicator>;
  BodyProps: ComponentProps<typeof AccordionBody>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  AccordionRoot,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionPanel,
  AccordionIndicator,
  AccordionBody,
};

export type {
  AccordionRootProps,
  AccordionRootProps as AccordionProps,
  AccordionItemProps,
  AccordionHeadingProps,
  AccordionTriggerProps,
  AccordionPanelProps,
  AccordionIndicatorProps,
  AccordionBodyProps,
} from "./accordion";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {accordionVariants} from "@heroui/styles";

export type {AccordionVariants} from "@heroui/styles";
