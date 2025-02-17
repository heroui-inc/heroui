import React from "react";
import {Meta} from "@storybook/react";
import {carousel} from "@heroui/theme";

import {Carousel, CarouselProps, CarouselItem} from "../src";

export default {
  title: "Components/Carousel",
  component: Carousel,
  argTypes: {
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Carousel>;

const defaultProps = {
  ...carousel.defaultVariants,
};

const Template = (args: CarouselProps) => (
  <Carousel {...args} slidesCount={6}>
    <CarouselItem image="https://www.heroui.com/images/card-example-6.jpeg" index={0} />
    <CarouselItem image="https://www.heroui.com/images/card-example-6.jpeg" index={1} />
    <CarouselItem image="https://www.heroui.com/images/card-example-6.jpeg" index={2} />
    <CarouselItem image="https://www.heroui.com/images/card-example-6.jpeg" index={3} />
    <CarouselItem image="https://www.heroui.com/images/card-example-6.jpeg" index={4} />
    <CarouselItem image="https://www.heroui.com/images/card-example-6.jpeg" index={5} />
  </Carousel>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
