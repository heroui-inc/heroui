import React from "react";
import {Meta} from "@storybook/react";
import {carousel} from "@heroui/theme";

import {Carousel, CarouselProps, CarouselItem} from "../src";

export default {
  title: "Components/Carousel",
  component: Carousel,
  argTypes: {
    loop: {
      control: {type: "boolean"},
    },
    thumbRadius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "xl", "full"],
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
    <CarouselItem image="https://picsum.photos/200" index={0} />
    <CarouselItem image="https://picsum.photos/200" index={1} />
    <CarouselItem image="https://picsum.photos/200" index={2} />
    <CarouselItem image="https://picsum.photos/200" index={3} />
    <CarouselItem image="https://picsum.photos/200" index={4} />
    <CarouselItem image="https://picsum.photos/200" index={5} />
  </Carousel>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
