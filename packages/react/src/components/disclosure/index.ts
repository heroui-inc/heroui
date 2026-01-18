import type {ComponentProps} from "react";

import {
  DisclosureBody,
  DisclosureContent,
  DisclosureHeading,
  DisclosureIndicator,
  DisclosureRoot,
  DisclosureTrigger,
} from "./disclosure";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Disclosure = Object.assign(DisclosureRoot, {
  Root: DisclosureRoot,
  Heading: DisclosureHeading,
  Trigger: DisclosureTrigger,
  Content: DisclosureContent,
  Body: DisclosureBody,
  Indicator: DisclosureIndicator,
});

export type Disclosure = {
  Props: ComponentProps<typeof DisclosureRoot>;
  RootProps: ComponentProps<typeof DisclosureRoot>;
  HeadingProps: ComponentProps<typeof DisclosureHeading>;
  TriggerProps: ComponentProps<typeof DisclosureTrigger>;
  ContentProps: ComponentProps<typeof DisclosureContent>;
  BodyProps: ComponentProps<typeof DisclosureBody>;
  IndicatorProps: ComponentProps<typeof DisclosureIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
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
  DisclosureRootProps as DisclosureProps,
  DisclosureContentProps,
  DisclosureHeadingProps,
  DisclosureTriggerProps,
  DisclosureIndicatorProps,
  DisclosureBodyContentProps,
} from "./disclosure";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {disclosureVariants} from "@heroui/styles";

export type {DisclosureVariants} from "@heroui/styles";
