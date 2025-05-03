import type {ChipProps} from "./chip";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";

import {Chip} from "./chip";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
    },
  },
  component: Chip,
  title: "Components/Chip",
} as Meta<typeof Chip>;

const Template = (_props: ChipProps) => (
  <div className="flex items-center gap-3">
    <Chip>Label</Chip>
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
    <Chip color="success">
      <Icon icon="gravity-ui:circle-fill" width={6} />
      Completed
    </Chip>
    <Chip color="warning">
      <Icon icon="gravity-ui:circle-fill" width={6} />
      Pending
    </Chip>
    <Chip color="danger">
      <Icon icon="gravity-ui:circle-fill" width={6} />
      Failed
    </Chip>
  </div>
);

export const Default = {
  args: {},
  render: Template,
};

export const WithIcon = {
  args: {},
  render: WithIconTemplate,
};

export const Statuses = {
  args: {},
  render: StatusesTemplate,
};
