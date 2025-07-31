import type {TooltipContentProps} from "./tooltip";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";

import {Button} from "../button";

import {Tooltip} from "./index";

export default {
  argTypes: {
    offset: {
      control: "number",
    },
    placement: {
      control: "select",
      options: [
        "bottom",
        "bottom left",
        "bottom right",
        "bottom start",
        "bottom end",
        "top",
        "top left",
        "top right",
        "top start",
        "top end",
        "left",
        "left top",
        "left bottom",
        "start",
        "start top",
        "start bottom",
        "right",
        "right top",
        "right bottom",
        "end",
        "end top",
        "end bottom",
      ],
    },
  },
  component: Tooltip,
  title: "🚧 In Progress/Tooltip",
} as Meta<typeof Tooltip>;

const defaultArgs: Omit<TooltipContentProps, "children"> = {
  showArrow: true,
};

const Template = (props: TooltipContentProps) => (
  <div className="flex items-center gap-3">
    <Tooltip delay={0}>
      <Button isIconOnly variant="tertiary">
        <Icon icon="gravity-ui:circle-info" />
      </Button>
      <Tooltip.Content {...props}>
        <Tooltip.Arrow />
        <p>Tooltip content</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
);

const TemplateWithTrigger = (props: TooltipContentProps) => (
  <div className="flex items-center gap-3">
    <Tooltip delay={0}>
      <Tooltip.Trigger aria-label="Tooltip trigger">
        <div className="bg-accent-soft rounded-full p-2">
          <Icon icon="gravity-ui:circle-info" />
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content {...props}>
        <Tooltip.Arrow />
        <p>Tooltip content</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithTrigger = {
  args: defaultArgs,
  render: TemplateWithTrigger,
};
