import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {DateField} from "../date-field";
import {Surface} from "../surface";

import {DateInputGroup} from "./index";

const meta: Meta<typeof DateInputGroup> = {
  component: DateInputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/DateInputGroup",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DateInputGroup aria-label="Date" className="w-[256px]">
      <DateInputGroup.Input>
        {(segment) => <DateInputGroup.Segment segment={segment} />}
      </DateInputGroup.Input>
    </DateInputGroup>
  ),
};

export const WithPrefix: Story = {
  render: () => (
    <DateInputGroup aria-label="Date" className="w-[256px]">
      <DateInputGroup.Prefix>
        <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
      </DateInputGroup.Prefix>
      <DateInputGroup.Input>
        {(segment) => <DateInputGroup.Segment segment={segment} />}
      </DateInputGroup.Input>
    </DateInputGroup>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <DateInputGroup aria-label="Date" className="w-[256px]">
      <DateInputGroup.Input>
        {(segment) => <DateInputGroup.Segment segment={segment} />}
      </DateInputGroup.Input>
      <DateInputGroup.Suffix>
        <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
      </DateInputGroup.Suffix>
    </DateInputGroup>
  ),
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <DateInputGroup aria-label="Date" className="w-[256px]">
      <DateInputGroup.Prefix>
        <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
      </DateInputGroup.Prefix>
      <DateInputGroup.Input>
        {(segment) => <DateInputGroup.Segment segment={segment} />}
      </DateInputGroup.Input>
      <DateInputGroup.Suffix>
        <Icon className="size-4 text-muted" icon="gravity-ui:chevron-down" />
      </DateInputGroup.Suffix>
    </DateInputGroup>
  ),
};

export const OnSurface: Story = {
  render: () => {
    return (
      <div className="flex h-[180px] w-[280px] items-center justify-center rounded-3xl bg-surface p-4">
        <Surface className="w-full">
          <DateField name="date">
            <DateInputGroup isOnSurface aria-label="Date" className="w-full">
              <DateInputGroup.Input>
                {(segment) => <DateInputGroup.Segment segment={segment} />}
              </DateInputGroup.Input>
            </DateInputGroup>
          </DateField>
        </Surface>
      </div>
    );
  },
};
