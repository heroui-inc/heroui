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

import {usePreventHidden} from "../../hooks";
import {mapPropsVariants, objectToDeps} from "../../utils";
import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {useMergeRef} from "../../utils/mergeRef";
import {IconChevronDown} from "../icons";

import {disclosureVariants} from "./disclosure.styles";

const DisclosureContext = createContext<{
  slots?: ReturnType<typeof disclosureVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureProps extends DisclosurePrimitiveProps, DisclosureVariants {}

const Disclosure = React.forwardRef<React.ElementRef<typeof DisclosurePrimitive>, DisclosureProps>(
  ({children, className, ...originalProps}, ref) => {
    const [props, variantProps] = mapPropsVariants(originalProps, disclosureVariants.variantKeys);

    const slots = React.useMemo(
      () => disclosureVariants({...(variantProps as DisclosureVariants)}),
      [objectToDeps(variantProps)],
    );

    return (
      <DisclosureContext.Provider value={{slots}}>
        <DisclosurePrimitive
          ref={ref}
          data-disclosure
          {...props}
          className={composeTwRenderProps(className, slots.base())}
        >
          {(values) => <>{typeof children === "function" ? children(values) : children}</>}
        </DisclosurePrimitive>
      </DisclosureContext.Provider>
    );
  },
);

Disclosure.displayName = "HeroUI.Disclosure";

/* -----------------------------------------------------------------------------------------------*/

interface DisclosureHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const DisclosureHeading = React.forwardRef<
  React.ElementRef<typeof DisclosureHeadingPrimitive>,
  DisclosureHeadingProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(DisclosureContext);

  return (
    <DisclosureHeadingPrimitive
      ref={ref}
      data-disclosure-heading
      className={slots?.heading({className})}
      {...props}
    />
  );
});

DisclosureHeading.displayName = "HeroUI.DisclosureHeading";

/* -----------------------------------------------------------------------------------------------*/

interface DisclosureTriggerProps extends ButtonProps {}

const DisclosureTrigger = React.forwardRef<React.ElementRef<typeof Button>, DisclosureTriggerProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(DisclosureContext);

    return (
      <Button
        ref={ref}
        data-disclosure-trigger
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

DisclosureTrigger.displayName = "HeroUI.DisclosureTrigger";

/* -----------------------------------------------------------------------------------------------*/

interface DisclosureContentProps extends DisclosurePanelProps {}

const DisclosureContent = React.forwardRef<
  React.ElementRef<typeof DisclosurePanel>,
  DisclosureContentProps
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(DisclosureContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergeRef(contentRef, ref);
  const {isExpanded} = useContext(DisclosureStateContext)!;

  // Prevent React Aria from setting hidden="until-found" which breaks animations
  usePreventHidden(contentRef);

  return (
    <DisclosurePanel
      ref={mergedRef}
      data-disclosure-content
      className={composeTwRenderProps(className, slots?.content())}
      data-expanded={dataAttr(isExpanded)}
      {...props}
    >
      {children}
    </DisclosurePanel>
  );
});

DisclosureContent.displayName = "HeroUI.DisclosureContent";

/* -----------------------------------------------------------------------------------------------*/

interface DisclosureBodyContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DisclosureBody = React.forwardRef<React.ElementRef<"div">, DisclosureBodyContentProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(DisclosureContext);

    return (
      <div ref={ref} data-disclosure-body className={slots?.body({})} {...props}>
        <div className={slots?.bodyInner({className})}>{children}</div>
      </div>
    );
  },
);

DisclosureBody.displayName = "HeroUI.DisclosureBody";

/* -----------------------------------------------------------------------------------------------*/

interface DisclosureIndicatorProps extends React.HTMLAttributes<SVGSVGElement> {
  className?: string;
}

const DisclosureIndicator = React.forwardRef<
  React.ElementRef<typeof IconChevronDown>,
  DisclosureIndicatorProps
>(({children, className, ...props}, ref) => {
  const {isExpanded} = useContext(DisclosureStateContext)!;
  const {slots} = useContext(DisclosureContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-disclosure-indicator"?: boolean;
        "data-expanded"?: Booleanish;
      }>,
      {
        ...props,
        "data-expanded": dataAttr(isExpanded),
        className: slots?.indicator({className}),
        "data-disclosure-indicator": true,
      },
    );
  }

  return (
    <IconChevronDown
      ref={ref}
      data-disclosure-indicator
      className={slots?.indicator({className})}
      data-expanded={dataAttr(isExpanded)}
      {...props}
    />
  );
});

DisclosureIndicator.displayName = "HeroUI.DisclosureIndicator";

/* -----------------------------------------------------------------------------------------------*/

const CompoundDisclosure = Object.assign(Disclosure, {
  Heading: DisclosureHeading,
  Trigger: DisclosureTrigger,
  Content: DisclosureContent,
  Body: DisclosureBody,
  Indicator: DisclosureIndicator,
});

export type {
  DisclosureProps,
  DisclosureContentProps,
  DisclosureHeadingProps,
  DisclosureTriggerProps,
  DisclosureIndicatorProps,
  DisclosureBodyContentProps,
};

export default CompoundDisclosure;
