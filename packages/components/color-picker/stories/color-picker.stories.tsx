import {Meta} from "@storybook/react";
import {colorPicker} from "@heroui/theme";

import {ColorPicker} from "../src";

export default {
  title: "Components/ColorPicker",
  component: ColorPicker,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light"],
    },
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
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof ColorPicker>;

const defaultProps = {
  ...colorPicker.defaultVariants,
  children: "ColorPicker",
};

export const Default = {
  args: {
    ...defaultProps,
  },
};

export const IsDisabled = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const FullWidth = {
  args: {
    ...defaultProps,
    fullWidth: true,
  },
};
