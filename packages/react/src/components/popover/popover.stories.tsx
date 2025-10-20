import type {PopoverContentProps} from "./index";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "../avatar";
import {Button} from "../button";

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverTrigger,
} from "./index";

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
  component: Popover,
  title: "Components/Overlays/Popover",
} as Meta<typeof Popover>;

const defaultArgs: Omit<PopoverContentProps, "children"> = {};

const Template = (props: PopoverContentProps) => (
  <div className="flex items-center gap-3">
    <Popover>
      <Button isIconOnly aria-label="Popover trigger" variant="tertiary">
        <Icon icon="gravity-ui:circle-info" />
      </Button>
      <PopoverContent {...props}>
        <PopoverDialog>
          <PopoverHeading>Popover heading</PopoverHeading>
          <p>This is the popover content</p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>
  </div>
);

const TemplateWithArrow = (props: PopoverContentProps) => (
  <div className="flex items-center gap-3">
    <Popover>
      <Button isIconOnly aria-label="Popover trigger" variant="tertiary">
        <Icon icon="gravity-ui:circle-info" />
      </Button>
      <PopoverContent {...props}>
        <PopoverDialog>
          <PopoverArrow />
          <PopoverHeading>Popover heading</PopoverHeading>
          <p>This is the popover content</p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>
  </div>
);

const TemplateWithCustomContent = (props: PopoverContentProps) => {
  const [isFollowing, setIsFollowing] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger aria-label="Popover trigger">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarImage alt="Zoe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5" />
              <AvatarFallback>Z</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium leading-5">Zoe</p>
              <p className="text-muted text-xs leading-none">zoe@heroui.com</p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent {...props} className="w-[290px]">
          <PopoverDialog className="flex flex-col gap-3">
            <PopoverHeading>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar size="md">
                    <AvatarImage
                      alt="Zoe"
                      src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
                    />
                    <AvatarFallback>Z</AvatarFallback>
                  </Avatar>
                  <div className="flex h-full flex-col items-start justify-center">
                    <span className="text-sm font-medium">Zoey Lang</span>
                    <span className="text-muted text-sm font-normal leading-4 tracking-tight">
                      @zoe
                    </span>
                  </div>
                </div>
                <Button
                  className="rounded-full text-xs font-normal"
                  size="sm"
                  variant={isFollowing ? "tertiary" : "primary"}
                  onPress={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </PopoverHeading>
            <div>
              <p className="pl-px text-sm">
                Design Engineer, @hero_ui lover she/her. SF Bay Area&nbsp;
                <span aria-label="confetti" role="img">
                  🎉
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-1">
                <p className="text-sm font-semibold">4</p>
                <p className="text-muted text-sm">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-semibold">97.1K</p>
                <p className="text-muted text-sm">Followers</p>
              </div>
            </div>
          </PopoverDialog>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithArrow = {
  args: defaultArgs,
  render: TemplateWithArrow,
};

export const WithCustomContent = {
  args: defaultArgs,
  render: TemplateWithCustomContent,
};

const SpringAnimationTemplate = (props: PopoverContentProps) => (
  <div className="flex flex-col items-center gap-8 p-8">
    <h1 className="text-xl font-semibold">Popover with Spring Animation</h1>
    <p className="text-muted text-sm">
      The popover now uses a spring easing function for a more dynamic feel
    </p>

    <div className="flex items-center gap-8">
      <Popover>
        <Button>Click for Spring Animation</Button>
        <PopoverContent
          {...props}
          className="data-[entering]:animate-in data-[entering]:zoom-in-90 data-[entering]:fade-in-0 data-[entering]:ease-spring data-[entering]:duration-600"
        >
          <PopoverDialog>
            <PopoverArrow />
            <PopoverHeading>Spring Animation 🎉</PopoverHeading>
            <p className="text-muted mt-2 text-sm">
              Notice the subtle bounce effect when the popover appears and disappears.
            </p>
            <p className="text-muted mt-4 text-xs">Easing: cubic-bezier(0.36, 1.66, 0.04, 1)</p>
          </PopoverDialog>
        </PopoverContent>
      </Popover>
    </div>

    <div className="text-muted space-y-1 text-center text-xs">
      <p>Animation classes applied:</p>
      <code className="bg-surface rounded px-2 py-1 text-xs">
        data-[entering]:animate-in data-[entering]:zoom-in-90 data-[entering]:fade-in-0
        data-[entering]:ease-spring data-[entering]:duration-600
      </code>
    </div>
  </div>
);

export const SpringAnimation = {
  args: defaultArgs,
  render: SpringAnimationTemplate,
};
