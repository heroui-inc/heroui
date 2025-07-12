import type {SpinnerProps} from "./spinner";
import type {Meta} from "@storybook/react";

import {Spinner} from "./spinner";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "current", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xl"],
    },
  },
  component: Spinner,
  title: "Components/Spinner",
} as Meta<typeof Spinner>;

const defaultArgs: SpinnerProps = {
  color: "accent",
  size: "sm",
};

const Template = (props: SpinnerProps) => (
  <div className="flex items-center gap-3">
    <Spinner {...props} />
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
