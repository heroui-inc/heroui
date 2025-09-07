import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Tabs} from "./index";

const meta = {
  argTypes: {},
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  title: "✅ Ready/Tabs",
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[600px]">
      <Tabs {...args}>
        <Tabs.ListWrapper>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="overview">Overview</Tabs.Tab>
            <Tabs.Tab id="analytics">Analytics</Tabs.Tab>
            <Tabs.Tab id="reports">Reports</Tabs.Tab>
          </Tabs.List>
          <Tabs.Indicator />
        </Tabs.ListWrapper>
        <Tabs.Panel className="pt-4" id="overview">
          <p>View your project overview and recent activity.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="analytics">
          <p>Track your metrics and analyze performance data.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="reports">
          <p>Generate and download detailed reports.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const VerticalTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[600px]">
      <Tabs {...args} orientation="vertical">
        <Tabs.ListWrapper>
          <Tabs.List aria-label="Vertical tabs">
            <Tabs.Tab id="account">Account</Tabs.Tab>
            <Tabs.Tab id="security">Security</Tabs.Tab>
            <Tabs.Tab id="notifications">Notifications</Tabs.Tab>
            <Tabs.Tab id="billing">Billing</Tabs.Tab>
          </Tabs.List>
          <Tabs.Indicator />
        </Tabs.ListWrapper>
        <Tabs.Panel className="px-4" id="account">
          <h3 className="mb-2 font-semibold">Account Settings</h3>
          <p className="text-sm text-gray-600">Manage your account information and preferences.</p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="security">
          <h3 className="mb-2 font-semibold">Security Settings</h3>
          <p className="text-sm text-gray-600">
            Configure two-factor authentication and password settings.
          </p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="notifications">
          <h3 className="mb-2 font-semibold">Notification Preferences</h3>
          <p className="text-sm text-gray-600">
            Choose how and when you want to receive notifications.
          </p>
        </Tabs.Panel>
        <Tabs.Panel className="px-4" id="billing">
          <h3 className="mb-2 font-semibold">Billing Information</h3>
          <p className="text-sm text-gray-600">
            View and manage your subscription and payment methods.
          </p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

const DisabledTabTemplate = (args: Story["args"]) => (
  <div className="w-[600px]">
    <Tabs {...args}>
      <Tabs.ListWrapper>
        <Tabs.List aria-label="Tabs with disabled">
          <Tabs.Tab id="active">Active</Tabs.Tab>
          <Tabs.Tab isDisabled id="disabled">
            Disabled
          </Tabs.Tab>
          <Tabs.Tab id="available">Available</Tabs.Tab>
        </Tabs.List>
        <Tabs.Indicator />
      </Tabs.ListWrapper>
      <Tabs.Panel className="pt-4" id="active">
        <p>This tab is active and can be selected.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="disabled">
        <p>This content cannot be accessed.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="available">
        <p>This tab is also available for selection.</p>
      </Tabs.Panel>
    </Tabs>
  </div>
);

const DefaultSelectedTemplate = (args: Story["args"]) => (
  <div className="w-[600px]">
    <Tabs {...args}>
      <Tabs.ListWrapper>
        <Tabs.List aria-label="Tabs with disabled">
          <Tabs.Tab id="active">Active</Tabs.Tab>
          <Tabs.Tab isDisabled id="disabled">
            Disabled
          </Tabs.Tab>
          <Tabs.Tab id="available">Available</Tabs.Tab>
        </Tabs.List>
        <Tabs.Indicator />
      </Tabs.ListWrapper>
      <Tabs.Panel className="pt-4" id="active">
        <p>This tab is active and can be selected.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="disabled">
        <p>This content cannot be accessed.</p>
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="available">
        <p>This tab is also available for selection.</p>
      </Tabs.Panel>
    </Tabs>
  </div>
);

const CustomStyleTemplate = (args: Story["args"]) => {
  return (
    <div className="w-[380px]">
      <Tabs {...args}>
        <Tabs.ListWrapper>
          <Tabs.List
            aria-label="Options"
            className="*:data-[selected=true]:text-accent-foreground w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal"
          >
            <Tabs.Tab id="daily">Daily</Tabs.Tab>
            <Tabs.Tab id="weekly">Weekly</Tabs.Tab>
            <Tabs.Tab id="bi-weekly">Bi-Weekly</Tabs.Tab>
            <Tabs.Tab id="monthly">Monthly</Tabs.Tab>
          </Tabs.List>
          <Tabs.Indicator className="bg-accent" />
        </Tabs.ListWrapper>
      </Tabs>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: null,
  },
  render: DefaultTemplate,
};

export const Vertical: Story = {
  args: {
    children: null,
    orientation: "vertical",
  },
  render: VerticalTemplate,
};

export const WithDisabledTab: Story = {
  args: {
    children: null,
  },
  render: DisabledTabTemplate,
};

export const WithDefaultSelectedTab: Story = {
  args: {
    children: null,
  },
  render: DefaultSelectedTemplate,
};

export const WithCustomStyle: Story = {
  args: {
    children: null,
  },
  render: CustomStyleTemplate,
};
