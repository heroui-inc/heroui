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

// Test for issue #5912: Tooltip should close when button with popover is clicked
const TooltipWithPopoverTemplate = (props: Tooltip["ContentProps"]) => (
  <div className="flex flex-col items-center gap-8 p-8">
    <div className="text-sm text-gray-600">
      <p><strong>Test for Issue #5912:</strong></p>
      <p>1. Hover over the button below to show tooltip</p>
      <p>2. Click the button to open popover</p>
      <p>3. Tooltip should close immediately (not stay visible)</p>
    </div>

    <Tooltip delay={0}>
      <Popover>
        <Button variant="secondary">Hover & Click Me</Button>
        <Popover.Content className="max-w-64" placement="bottom">
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>Popover Content</Popover.Heading>
            <p className="text-sm mt-2">
              The tooltip should have closed when you clicked the button!
              If you can still see the tooltip, the bug is NOT fixed.
            </p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <Tooltip.Content {...props}>
        <Tooltip.Arrow />
        <p>This tooltip should close on click</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
);

export const WithPopover = {
  args: defaultArgs,
  render: TooltipWithPopoverTemplate,
};
