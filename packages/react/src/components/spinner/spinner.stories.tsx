import type {SpinnerProps} from "./spinner";
import type {Meta} from "@storybook/react";

import React from "react";

import {Spinner} from "./spinner";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "current", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xl"],
    },
  },
  component: Spinner,
  title: "✅ Ready/Spinner",
} as Meta<typeof Spinner>;

const defaultArgs: SpinnerProps = {};

const Template = (props: SpinnerProps) => (
  <div className="flex items-center gap-3">
    <Spinner {...props} />
  </div>
);

const ColorsTemplate = (props: SpinnerProps) => (
  <div className="flex items-center gap-8">
    <div className="flex flex-col items-center gap-2">
      <Spinner color="accent" {...props} />
      <span className="text-muted text-xs">Accent</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner color="current" {...props} />
      <span className="text-muted text-xs">Current</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner color="success" {...props} />
      <span className="text-muted text-xs">Success</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner color="warning" {...props} />
      <span className="text-muted text-xs">Warning</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner color="danger" {...props} />
      <span className="text-muted text-xs">Danger</span>
    </div>
  </div>
);

const SizesTemplate = (props: SpinnerProps) => (
  <div className="flex items-center gap-8">
    <div className="flex flex-col items-center gap-2">
      <Spinner size="sm" {...props} />
      <span className="text-muted text-xs">Small</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="md" {...props} />
      <span className="text-muted text-xs">Medium</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="lg" {...props} />
      <span className="text-muted text-xs">Large</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="xl" {...props} />
      <span className="text-muted text-xs">Extra Large</span>
    </div>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const Colors = {
  args: defaultArgs,
  render: ColorsTemplate,
};

export const Sizes = {
  args: defaultArgs,
  render: SizesTemplate,
};
