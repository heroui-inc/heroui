import {Meta} from "@storybook/react";
import {colorPicker} from "@heroui/theme";

import {ColorPicker, ColorPickerProps} from "../src";

export default {
  title: "Components/ColorPicker",
  component: ColorPicker,
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

const HiddenOverflowTemplate = (args: ColorPickerProps) => (
  <div className="">
    <ColorPicker {...args} />
  </div>
);

export const HiddenOverflow = {
  render: HiddenOverflowTemplate,
  args: {
    ...defaultProps,
    children: "Hello World!",
  },
};
