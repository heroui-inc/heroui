import type {Meta} from "@storybook/react";

import {code} from "@heroui/theme";

import {Code} from "../src";

export default {
  title: "Components/Code",
  component: Code,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
} as Meta<typeof Code>;

const defaultProps = {
  children: "npm install @heroui/react",
  ...code.defaultVariants,
};

export const Default = {
  args: {
    ...defaultProps,
  },
};
