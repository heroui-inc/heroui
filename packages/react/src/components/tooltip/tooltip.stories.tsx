import type {TooltipContentProps} from "./index";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";

import {Tooltip, TooltipArrow, TooltipContent, TooltipTrigger} from "./index";

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

const defaultArgs: Omit<TooltipContentProps, "children"> = {
  showArrow: true,
};

const Template = (props: TooltipContentProps) => (
  <div className="flex items-center gap-3">
    <Tooltip delay={0}>
      <Button isIconOnly variant="tertiary">
        <Icon icon="gravity-ui:circle-info" />
      </Button>
      <TooltipContent {...props}>
        <TooltipArrow />
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>
  </div>
);

const TemplateWithTrigger = (props: TooltipContentProps) => (
  <div className="flex items-center gap-3">
    <Tooltip delay={0}>
      <TooltipTrigger aria-label="Tooltip trigger">
        <div className="bg-accent-soft rounded-full p-2">
          <Icon icon="gravity-ui:circle-info" />
        </div>
      </TooltipTrigger>
      <TooltipContent {...props}>
        <TooltipArrow />
        <p>Tooltip content</p>
      </TooltipContent>
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
