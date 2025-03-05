import {Meta} from "@storybook/react";

import {Button} from "./button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
} as Meta<typeof Button>;

const defaultArgs = {
  children: "Button",
};

export const Default = {
  args: {...defaultArgs},
};
