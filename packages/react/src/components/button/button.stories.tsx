import type {ButtonProps} from "./button";

import {Meta} from "@storybook/react";

import {Button} from "./button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "flat", "ghost", "bordered", "link"],
    },
  },
} as Meta<typeof Button>;

const Template = (_: ButtonProps) => (
  <div className="flex gap-3">
    <Button>Buy now</Button>
    <Button variant="flat">Add to wishlist</Button>
    <Button variant="bordered">Contact us</Button>
    <Button variant="ghost">Cancel</Button>
    <Button variant="link">Link</Button>
    <Button variant="danger">Delete</Button>
  </div>
);

export const Default = {
  render: Template,

  args: {},
};
