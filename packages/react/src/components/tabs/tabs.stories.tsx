import type {Meta, StoryObj} from "@storybook/react";

import * as Tabs from "./index";

const meta = {
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "line"],
    },
  },
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  title: "Components/Tabs",
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = (args: Story["args"]) => (
  <div className="w-[600px]">
    <Tabs {...args}>
      <Tabs.TabList aria-label="Example tabs">
        <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
        <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel id="tab1">Content for tab 1</Tabs.TabPanel>
      <Tabs.TabPanel id="tab2">Content for tab 2</Tabs.TabPanel>
      <Tabs.TabPanel id="tab3">Content for tab 3</Tabs.TabPanel>
    </Tabs>
  </div>
);

export const Default: Story = {
  args: {
    children: null,
  },
  render: DefaultTemplate,
};

export const Surface: Story = {
  args: {
    children: null,
    variant: "default",
  },
  render: DefaultTemplate,
};

export const Vertical: Story = {
  args: {
    children: null,
    orientation: "vertical",
  },
  render: DefaultTemplate,
};

export const VerticalSurface: Story = {
  args: {
    children: null,
    orientation: "vertical",
    variant: "line",
  },
  render: DefaultTemplate,
};

const DisabledTabTemplate = (args: Story["args"]) => (
  <div className="w-[600px]">
    <Tabs {...args}>
      <Tabs.TabList aria-label="Example tabs with disabled tab">
        <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab isDisabled id="tab2">
          Tab 2 (Disabled)
        </Tabs.Tab>
        <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel id="tab1">Content for tab 1</Tabs.TabPanel>
      <Tabs.TabPanel id="tab2">Content for tab 2</Tabs.TabPanel>
      <Tabs.TabPanel id="tab3">Content for tab 3</Tabs.TabPanel>
    </Tabs>
  </div>
);

export const WithDisabledTab: Story = {
  args: {
    children: null,
  },
  render: DisabledTabTemplate,
};

const DefaultSelectedTemplate = (args: Story["args"]) => (
  <div className="w-[600px]">
    <Tabs defaultSelectedKey="tab2" {...args}>
      <Tabs.TabList aria-label="Example tabs with default selection">
        <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="tab2">Tab 2 (Default)</Tabs.Tab>
        <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.TabPanel id="tab1">Content for tab 1</Tabs.TabPanel>
      <Tabs.TabPanel id="tab2">Content for tab 2</Tabs.TabPanel>
      <Tabs.TabPanel id="tab3">Content for tab 3</Tabs.TabPanel>
    </Tabs>
  </div>
);

export const WithDefaultSelectedTab: Story = {
  args: {
    children: null,
  },
  render: DefaultSelectedTemplate,
};
