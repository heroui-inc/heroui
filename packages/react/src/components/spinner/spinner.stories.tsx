import type {SpinnerProps} from "./spinner";
import type {Meta} from "@storybook/react";

import {Spinner} from "./spinner";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "base", "danger", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["extra-large", "large", "medium", "small"],
    },
  },
  component: Spinner,
  title: "Components/Spinner",
} as Meta<typeof Spinner>;

const defaultArgs: SpinnerProps = {
  color: "accent",
  size: "small",
};

const Template = (_props: SpinnerProps) => (
  <div className="flex items-center gap-3">
    <Spinner {...defaultArgs} />
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
