import type {CloseButtonProps} from "./index";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {CloseButton} from "./index";

export default {
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    variant: {
      control: "select",
      options: ["default"],
    },
  },
  component: CloseButton,
  title: "Components/Buttons/CloseButton",
} as Meta<typeof CloseButton>;

const defaultArgs: CloseButtonProps = {
  variant: "default",
  isDisabled: false,
};

const Template = (args: CloseButtonProps) => (
  <div className="flex gap-3">
    <CloseButton {...args} />
  </div>
);

const TemplateWithCustomIcon = (args: CloseButtonProps) => (
  <div className="flex gap-3">
    <CloseButton {...args}>
      <Icon icon="gravity-ui:circle-xmark" />
    </CloseButton>
  </div>
);

const InteractiveTemplate = (args: CloseButtonProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CloseButton
        {...args}
        aria-label={`Close (clicked ${count} times)`}
        onPress={() => setCount(count + 1)}
      />

      <span className="text-sm">Clicked: {count} times</span>
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithCustomIcon = {
  args: defaultArgs,
  render: TemplateWithCustomIcon,
};

export const Interactive = {
  args: defaultArgs,
  render: InteractiveTemplate,
};
