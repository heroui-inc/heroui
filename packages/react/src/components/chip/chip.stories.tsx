import type {ChipProps} from "./chip";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Chip} from "./chip";

export default {
  argTypes: {
    type: {
      control: "select",
      options: ["default", "success", "warning", "danger", "accent"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
  },
  component: Chip,
  title: "Components/Chip",
} as Meta<typeof Chip>;

const defaultArgs: ChipProps = {
  children: "Label",
  type: "accent",
  variant: "secondary",
};

const Template = (_props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip {...defaultArgs}>Label</Chip>
  </div>
);

const WithIconTemplate = (_props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip>
      <Icon icon="gravity-ui:circle-dashed" />
      Label <Icon icon="gravity-ui:circle-dashed" />
    </Chip>
  </div>
);

const StatusesTemplate = (_props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip>
      <Icon icon="gravity-ui:circle-fill" width={6} />
      Information
    </Chip>
    <Chip type="success">
      <Icon icon="gravity-ui:circle-fill" width={6} />
      Completed
    </Chip>
    <Chip type="warning">
      <Icon icon="gravity-ui:circle-fill" width={6} />
      Pending
    </Chip>
    <Chip type="danger">
      <Icon icon="gravity-ui:circle-fill" width={6} />
      Failed
    </Chip>
  </div>
);

const VariantsTemplate = (props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip {...props} type="accent">
      Accent
    </Chip>
    <Chip {...props} type="success">
      Success
    </Chip>
    <Chip {...props} type="warning">
      Warning
    </Chip>
    <Chip {...props} type="danger">
      Danger
    </Chip>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithIcon = {
  args: defaultArgs,
  render: WithIconTemplate,
};

export const Statuses = {
  args: defaultArgs,
  render: StatusesTemplate,
};

export const Variants = {
  args: defaultArgs,
  render: VariantsTemplate,
};
