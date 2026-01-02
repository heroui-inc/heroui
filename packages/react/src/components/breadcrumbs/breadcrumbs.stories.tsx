import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Breadcrumbs, BreadcrumbsItem} from "./index";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Navigation/Breadcrumbs",
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = () => (
  <Breadcrumbs>
    <BreadcrumbsItem href="#">Home</BreadcrumbsItem>
    <BreadcrumbsItem href="#">Products</BreadcrumbsItem>
    <BreadcrumbsItem href="#">Electronics</BreadcrumbsItem>
    <BreadcrumbsItem>Laptop</BreadcrumbsItem>
  </Breadcrumbs>
);

const Level3Template = () => (
  <Breadcrumbs>
    <BreadcrumbsItem href="#">Home</BreadcrumbsItem>
    <BreadcrumbsItem href="#">Category</BreadcrumbsItem>
    <BreadcrumbsItem>Current Page</BreadcrumbsItem>
  </Breadcrumbs>
);

const Level2Template = () => (
  <Breadcrumbs>
    <BreadcrumbsItem href="#">Home</BreadcrumbsItem>
    <BreadcrumbsItem>Current Page</BreadcrumbsItem>
  </Breadcrumbs>
);

const CustomSeparatorTemplate = () => (
  <Breadcrumbs separator={<Icon icon="gravity-ui:caret-right" />}>
    <BreadcrumbsItem href="#">Home</BreadcrumbsItem>
    <BreadcrumbsItem href="#">Products</BreadcrumbsItem>
    <BreadcrumbsItem href="#">Electronics</BreadcrumbsItem>
    <BreadcrumbsItem>Laptop</BreadcrumbsItem>
  </Breadcrumbs>
);

const DisabledTemplate = () => (
  <Breadcrumbs isDisabled>
    <BreadcrumbsItem href="#">Home</BreadcrumbsItem>
    <BreadcrumbsItem href="#">Products</BreadcrumbsItem>
    <BreadcrumbsItem href="#">Electronics</BreadcrumbsItem>
    <BreadcrumbsItem>Laptop</BreadcrumbsItem>
  </Breadcrumbs>
);

export const Default: Story = {
  render: DefaultTemplate,
};

export const Level3: Story = {
  render: Level3Template,
};

export const Level2: Story = {
  render: Level2Template,
};

export const CustomSeparator: Story = {
  render: CustomSeparatorTemplate,
};

export const Disabled: Story = {
  render: DisabledTemplate,
};
