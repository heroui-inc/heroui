import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Popover} from "../popover";

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
  title: "Components/Overlays/Tooltip",
} as Meta<typeof Tooltip>;

const defaultArgs: Omit<Tooltip["ContentProps"], "children"> = {
  showArrow: true,
};

const Template = (props: Tooltip["ContentProps"]) => (
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

const TemplateWithTrigger = (props: Tooltip["ContentProps"]) => (
  <div className="flex items-center gap-3">
    <Tooltip delay={0}>
      <Tooltip.Trigger aria-label="Tooltip trigger">
        <div className="rounded-full bg-accent-soft p-2">
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

const TooltipWithPopoverTemplate = (props: Tooltip["ContentProps"]) => (
  <div className="flex items-center gap-3">
    <Tooltip delay={0}>
      <Popover>
        <Button variant="secondary">
          <Icon icon="gravity-ui:gear" />
          Settings
        </Button>
        <Popover.Content className="w-64" placement="bottom">
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>Settings</Popover.Heading>
            <p className="mt-2 text-sm">Configure your preferences</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <Tooltip.Content {...props}>
        <Tooltip.Arrow />
        <p>Open settings</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
);

export const WithPopover = {
  args: defaultArgs,
  render: TooltipWithPopoverTemplate,
};
