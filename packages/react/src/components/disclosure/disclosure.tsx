"use client";

import type {DisclosureVariants} from "./disclosure.styles";
import type {CSSProperties} from "react";
import type {
  ButtonProps,
  DisclosurePanelProps,
  DisclosureProps as DisclosurePrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext, useRef} from "react";
import {Button, DisclosurePanel, Disclosure as DisclosurePrimitive} from "react-aria-components";

import {useMeasuredHeight} from "../../hooks";
import {mapPropsVariants, objectToDeps} from "../../utils";
import {composeTwRenderProps} from "../../utils/compose";
import {useMergeRef} from "../../utils/mergeRef";

import {disclosureVariants} from "./disclosure.styles";

const DisclosureContext = createContext<{
  slots?: ReturnType<typeof disclosureVariants>;
  isExpanded?: boolean;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Disclosure
 * -----------------------------------------------------------------------------------------------*/

interface DisclosureProps extends DisclosurePrimitiveProps, DisclosureVariants {}

const Disclosure = React.forwardRef<React.ElementRef<typeof DisclosurePrimitive>, DisclosureProps>(
  ({children, className, isExpanded, onExpandedChange, ...originalProps}, ref) => {
    const [props, variantProps] = mapPropsVariants(originalProps, disclosureVariants.variantKeys);

    const slots = React.useMemo(
      () => disclosureVariants({...(variantProps as DisclosureVariants)}),
      [objectToDeps(variantProps)],
    );

    return (
      <DisclosureContext.Provider value={{slots, isExpanded}}>
        <DisclosurePrimitive
          ref={ref}
          data-disclosure
          isExpanded={isExpanded}
          onExpandedChange={onExpandedChange}
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
  const {height: contentHeight} = useMeasuredHeight(contentRef);
  const mergedRef = useMergeRef(contentRef, ref);

  return (
    <DisclosurePanel
      ref={mergedRef}
      data-disclosure-content
      className={composeTwRenderProps(className, slots?.content())}
      {...props}
      style={
        {
          "--content-height": `${contentHeight}px`,
        } as CSSProperties
      }
    >
      {children}
    </DisclosurePanel>
  );
});

DisclosureContent.displayName = "HeroUI.DisclosureContent";

/* -----------------------------------------------------------------------------------------------*/

const CompoundDisclosure = Object.assign(Disclosure, {
  Trigger: DisclosureTrigger,
  Content: DisclosureContent,
});

export type {DisclosureProps, DisclosureTriggerProps, DisclosureContentProps};

export default CompoundDisclosure;
