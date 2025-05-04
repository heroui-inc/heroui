import type {PopoverContentProps} from "./popover";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";

import {Button} from "../button";

import {Popover} from "./index";

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
  component: Popover.Root,
  title: "Components/Popover",
} as Meta<typeof Popover.Root>;

const defaultArgs: Omit<PopoverContentProps, "children"> = {
  showArrow: true,
};

const Template = (props: PopoverContentProps) => (
  <div className="flex items-center gap-3">
    <Popover.Root>
      <Popover.Trigger aria-label="Popover trigger">
        <Button isIconOnly variant="tertiary">
          <Icon icon="gravity-ui:circle-info" />
        </Button>
      </Popover.Trigger>
      <Popover.Content {...props}>
        <Popover.Heading>Popover heading</Popover.Heading>
        <p>Popover content</p>
      </Popover.Content>
    </Popover.Root>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
