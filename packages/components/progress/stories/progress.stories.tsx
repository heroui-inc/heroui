import type {Meta} from "@storybook/react";
import type {ProgressProps} from "../src";

import React from "react";
import {progress} from "@heroui/theme";

import {Progress} from "../src";

export default {
  title: "Components/Progress",
  component: Progress,
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
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Progress>;

const defaultProps = {
  ...progress.defaultVariants,
  value: 55,
};

const Template = (args: ProgressProps) => (
  <div className="max-w-[400px]">
    <Progress {...args} />
  </div>
);

const IntervalTemplate = (args: ProgressProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[400px]">
      <Progress {...args} value={value} />
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
    "aria-label": "Loading...",
  },
};

export const WithLabel = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Loading...",
  },
};

export const WithValueLabel = {
  render: IntervalTemplate,

  args: {
    ...defaultProps,
    label: "Downloading...",
    color: "success",
    showValueLabel: true,
  },
};

export const WithValueFormatting = {
  render: Template,

  args: {
    ...defaultProps,
    label: "Loading...",
    showValueLabel: true,
    formatOptions: {style: "currency", currency: "ARS"},
  },
};

export const Indeterminate = {
  render: Template,

  args: {
    ...defaultProps,
    size: "sm",
    radius: "none",
    isIndeterminate: true,
  },
};

export const Striped = {
  render: Template,

  args: {
    ...defaultProps,
    isStriped: true,
  },
};

export const CustomSlots = {
  render: Template,

  args: {
    ...defaultProps,
    classNames: {
      indicator: "bg-[#14708A] rounded-[4px]",
      track: "bg-red-500 rounded-[4px]",
    },
  },
};
