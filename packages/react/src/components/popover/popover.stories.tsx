import type {PopoverContentProps} from "./popover";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";

import {Avatar} from "../avatar";
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
        <p>This is the popover content</p>
      </Popover.Content>
    </Popover.Root>
  </div>
);

const TemplateWithCustomContent = (props: PopoverContentProps) => (
  <div className="flex items-center gap-3">
    <Popover.Root>
      <Popover.Trigger aria-label="Popover trigger">
        <div className="focus-visible:ring-focus focus-visible:ring-offset-background flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
          <Avatar.Root size="sm">
            <Avatar.Image alt="Zoe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5" />
            <Avatar.Fallback>Z</Avatar.Fallback>
          </Avatar.Root>
          <div className="flex flex-col gap-0">
            <p className="text-sm font-medium leading-5">Zoe</p>
            <p className="text-muted text-xs leading-none">zoe@heroui.chat</p>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Content {...props} className="w-[300px]">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Avatar.Root size="sm">
              <Avatar.Image alt="Zoe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5" />
              <Avatar.Fallback>Z</Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm font-medium leading-none">Zoey Lang</span>
              <span className="text-muted text-sm tracking-tight">@zoe</span>
            </div>
          </div>
          <Button className="text-xs font-normal" size="sm" variant="primary">
            Follow
          </Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithCustomContent = {
  args: defaultArgs,
  render: TemplateWithCustomContent,
};
