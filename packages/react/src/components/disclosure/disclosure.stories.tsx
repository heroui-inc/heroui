import type {DisclosureProps} from "./disclosure";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Chip} from "../chip";

import {Disclosure} from "./index";

export default {
  argTypes: {
    isExpanded: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
  component: Disclosure,
  title: "✅ Ready/Disclosure",
} as Meta<typeof Disclosure>;

const defaultArgs: DisclosureProps = {
  isExpanded: false,
  isDisabled: false,
};

const Template = (props: DisclosureProps) => {
  const [isExpanded, setIsExpanded] = React.useState(props.isExpanded ?? false);

  return (
    <div className="w-full max-w-md">
      <Disclosure {...props} isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Trigger className="flex w-full items-center justify-between rounded-md border border-gray-300 px-4 py-2 text-left hover:bg-gray-50">
          <span>Toggle content</span>
          <Icon
            className="size-4 transition-transform duration-200 data-[state=open]:rotate-180"
            icon="gravity-ui:chevron-down"
          />
        </Disclosure.Trigger>
        <Disclosure.Content>
          <div className="mt-4 rounded-lg border p-4">
            <p className="text-sm">
              This is the disclosure content. It can contain any React elements including text,
              images, or other components. The content will animate when expanding and collapsing.
            </p>
          </div>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

const ControlledTemplate = (props: DisclosureProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="primary" onPress={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"} from outside
        </Button>
        <Chip color={isExpanded ? "success" : "default"}>
          State: {isExpanded ? "Expanded" : "Collapsed"}
        </Chip>
      </div>
      <Disclosure {...props} isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Trigger className="flex w-full items-center justify-between rounded-md border border-gray-300 px-4 py-2 text-left hover:bg-gray-50">
          <span>Toggle content</span>
          <Icon
            className="size-4 transition-transform duration-200 data-[state=open]:rotate-180"
            icon="gravity-ui:chevron-down"
          />
        </Disclosure.Trigger>
        <Disclosure.Content>
          <div className="mt-4 rounded-lg border p-4">
            <p className="text-sm">
              This disclosure is controlled from outside. You can toggle it using the button above
              or by clicking the trigger.
            </p>
          </div>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

const ProductDetailsTemplate = (props: DisclosureProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="w-full max-w-md">
      <Disclosure {...props} isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Trigger className="flex w-full items-center justify-between rounded-md border border-gray-300 px-4 py-2 text-left hover:bg-gray-50">
          <span className="flex items-center gap-2">
            <Icon icon="gravity-ui:box" />
            View product details
          </span>
          <Icon
            className="size-4 transition-transform duration-200"
            icon={isExpanded ? "gravity-ui:chevron-up" : "gravity-ui:chevron-down"}
          />
        </Disclosure.Trigger>
        <Disclosure.Content>
          <div className="mt-4 space-y-4 rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Material:</span>
                <span>100% Cotton</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span>Medium (38-40)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Color:</span>
                <span>Navy Blue</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Care:</span>
                <span>Machine wash cold</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Chip color="success">Free Shipping</Chip>
              <Chip color="accent">1 Year Warranty</Chip>
              <Chip color="warning">Eco-Friendly</Chip>
            </div>
          </div>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

export const Default = {
  args: {
    ...defaultArgs,
  },
  render: Template,
};

export const Controlled = {
  args: {
    ...defaultArgs,
  },
  render: ControlledTemplate,
};

export const ProductDetails = {
  args: {
    ...defaultArgs,
  },
  render: ProductDetailsTemplate,
};

export const InitiallyExpanded = {
  args: {
    ...defaultArgs,
    isExpanded: true,
  },
  render: Template,
};

export const Disabled = {
  args: {
    ...defaultArgs,
    isDisabled: true,
  },
  render: Template,
};
