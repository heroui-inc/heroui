"use client";

import type {Ref} from "react";
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components";

import React from "react";
import {Button, Disclosure, DisclosureGroup, DisclosurePanel, Heading} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";

import {slots} from "./accordion.styles";

interface AccordionProps extends DisclosureGroupProps {
  ref?: Ref<HTMLDivElement>;
}

const Accordion = ({children, className, ref, ...props}: AccordionProps) => {
  return (
    <DisclosureGroup
      ref={ref}
      data-slot="accordion"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <div data-slot="accordion-content">
          {typeof children === "function" ? children(values) : children}
        </div>
      )}
    </DisclosureGroup>
  );
};

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

interface AccordionTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
  icon?: React.ReactNode;
}

const AccordionTrigger = ({className, icon, ref, ...props}: AccordionTriggerProps) => {
  return (
    <Heading className={slots.heading()} data-slot="accordion-trigger-heading">
      <Button
        ref={ref}
        className={composeTwRenderProps(className, slots.trigger())}
        data-slot="accordion-trigger"
        slot="trigger"
        {...props}
      >
        {(values) => (
          <>
            {typeof props.children === "function" ? props.children(values) : props.children}
            {icon && React.isValidElement(icon) ? (
              React.cloneElement(
                icon as React.ReactElement<{className?: string; "data-slot"?: string}>,
                {
                  className: slots.chevron(),
                  "data-slot": "accordion-chevron",
                },
              )
            ) : (
              <IconChevronDown className={slots.chevron()} data-slot="accordion-chevron" />
            )}
          </>
        )}
      </Button>
    </Heading>
  );
};

interface AccordionContentProps extends DisclosurePanelProps {
  ref?: React.Ref<HTMLDivElement>;
}

const AccordionContent = ({className, ref, ...props}: AccordionContentProps) => {
  return (
    <DisclosurePanel
      ref={ref}
      className={composeTwRenderProps(className, slots.content())}
      data-slot="accordion-content"
      {...props}
    >
      <div className={slots.innerContent()} data-slot="accordion-content-inner">
        {props.children}
      </div>
    </DisclosurePanel>
  );
};

const Root = Accordion;
const Item = AccordionItem;
const Header = Heading;
const Trigger = AccordionTrigger;
const Content = AccordionContent;

export {Root, Item, Header, Trigger, Content};
export type {AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps};
