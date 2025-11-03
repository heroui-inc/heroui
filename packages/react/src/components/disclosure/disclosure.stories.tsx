import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Chip} from "../chip";

import {Disclosure} from "./index";

export default {
  argTypes: {
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isExpanded: {
      control: {
        type: "boolean",
      },
    },
  },
  component: Disclosure,
  parameters: {
    layout: "centered",
  },
  title: "Components/Navigation/Disclosure",
} as Meta<typeof Disclosure>;

const defaultArgs: Disclosure["RootProps"] = {
  isDisabled: false,
  isExpanded: false,
};

const Template = (props: Disclosure["RootProps"]) => {
  const [isExpanded, setIsExpanded] = React.useState(props.isExpanded ?? false);

  return (
    <div className="w-full max-w-md text-center">
      <Disclosure {...props} isExpanded={isExpanded} onExpandedChange={setIsExpanded}>
        <Disclosure.Heading>
          <Button slot="trigger" variant="secondary">
            <Icon icon="gravity-ui:qr-code" />
            Preview HeroUI Native
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="bg-surface shadow-surface flex flex-col items-center rounded-3xl p-2 p-4 text-center">
            <p className="text-muted text-sm">
              Scan this QR code with your camera app to preview the HeroUI native components.
            </p>
            <img
              alt="Expo Go QR Code"
              className="max-w-54 aspect-square w-full object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png"
            />
            <p className="text-muted text-sm">Expo must be installed on your device.</p>
            <Button className="mt-4" variant="primary">
              <Icon icon="tabler:brand-apple-filled" />
              Download on App Store
            </Button>
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

const ControlledTemplate = (props: Disclosure["RootProps"]) => {
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
        <Disclosure.Trigger className="mb-2 flex w-full items-center justify-between rounded-md border border-gray-300 px-4 py-2 text-left hover:bg-gray-50">
          <span>Toggle content</span>
          <Icon
            className="size-4 transition-transform duration-200 data-[state=open]:rotate-180"
            icon="gravity-ui:chevron-down"
          />
        </Disclosure.Trigger>
        <Disclosure.Content>
          <Disclosure.Body className="rounded-lg border p-4">
            <p className="text-sm">
              This disclosure is controlled from outside. You can toggle it using the button above
              or by clicking the trigger.
            </p>
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

const ProductDetailsTemplate = (props: Disclosure["RootProps"]) => {
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
          <Disclosure.Body className="pt-2">
            <div className="space-y-4 rounded-lg border p-4">
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
          </Disclosure.Body>
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
