import React from "react";
import {Meta} from "@storybook/react";
import {spinner} from "@heroui/theme";

import {Spinner} from "../src";

export default {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    labelColor: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="ml-4">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Spinner>;

const defaultProps = {
  ...spinner.defaultVariants,
};

const VariantsTemplate = () => {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="default"
        variant="default"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="gradient"
        variant="gradient"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="star"
        variant="star"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="dots"
        variant="dots"
      />
      <Spinner
        classNames={{label: "font-semibold text-foreground-600"}}
        color="default"
        label="dots-blink"
        variant="dots-blink"
      />
    </div>
  );
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithLabel = {
  args: {
    ...defaultProps,
    label: "Loading...",
  },
};

export const Variants = {
  args: {
    ...defaultProps,
    className: "h-full w-full",
  },

  render: VariantsTemplate,
};
