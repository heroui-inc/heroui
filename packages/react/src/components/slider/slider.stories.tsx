import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Slider} from "./index";

const meta: Meta<typeof Slider> = {
  argTypes: {
    isDisabled: {
      control: {type: "boolean"},
    },
    orientation: {
      control: {type: "select"},
      options: ["horizontal", "vertical"],
    },
  },
  component: Slider,
  decorators: [
    (Story) => (
      <div className="w-96 p-8">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Slider",
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <Slider defaultValue={50} {...args}>
      {({state}) => (
        <>
          <Slider.Header>
            <Slider.Label>Title</Slider.Label>
            <Slider.Output />
          </Slider.Header>
          <Slider.Track>
            <Slider.Fill percentage={state.getThumbPercent(0) * 100} />
            <Slider.Thumb />
          </Slider.Track>
        </>
      )}
    </Slider>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <Slider defaultValue={30} {...args}>
      {({state}) => (
        <>
          <Slider.Header>
            <Slider.Label>Title</Slider.Label>
            <Slider.Output />
          </Slider.Header>
          <Slider.Track>
            <Slider.Fill percentage={state.getThumbPercent(0) * 100} />
            <Slider.Thumb />
          </Slider.Track>
        </>
      )}
    </Slider>
  ),
};

export const WithMarks: Story = {
  render: () => (
    <Slider defaultValue={50} step={25}>
      {({state}) => (
        <>
          <Slider.Header>
            <Slider.Label>Title</Slider.Label>
            <Slider.Output />
          </Slider.Header>
          <Slider.Track>
            <Slider.Fill percentage={state.getThumbPercent(0) * 100} />
            <Slider.Thumb />
          </Slider.Track>
          <Slider.Marks>
            <span>20%</span>
            <span>50%</span>
            <span>80%</span>
          </Slider.Marks>
        </>
      )}
    </Slider>
  ),
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = React.useState([20, 80]);

    return (
      <Slider value={value} onChange={(newValue) => setValue(newValue as number[])}>
        <Slider.Header>
          <Slider.Label>Title</Slider.Label>
          <Slider.Output />
        </Slider.Header>
        <Slider.Track>
          <Slider.Fill
            style={{
              left: `${value[0] ?? 0}%`,
              width: `${(value[1] ?? 0) - (value[0] ?? 0)}%`,
            }}
          />
          <Slider.Thumb index={0} />
          <Slider.Thumb index={1} />
        </Slider.Track>
        <Slider.Marks>
          <span>20%</span>
          <span>50%</span>
          <span>80%</span>
        </Slider.Marks>
      </Slider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);

    return (
      <div className="space-y-4">
        <Slider value={value} onChange={(newValue) => setValue(newValue as number)}>
          <Slider.Header>
            <Slider.Label>Price</Slider.Label>
            <Slider.Output />
          </Slider.Header>
          <Slider.Track>
            <Slider.Fill percentage={value} />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
        <p className="text-gray-11 text-sm">External value: {value}</p>
      </div>
    );
  },
};

export const Examples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Light theme example */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <Slider defaultValue={50} maxValue={100000}>
          {({state}) => (
            <>
              <Slider.Header>
                <Slider.Label>Price</Slider.Label>
                <Slider.Output />
              </Slider.Header>
              <Slider.Track>
                <Slider.Fill percentage={state.getThumbPercent(0) * 100} />
                <Slider.Thumb />
              </Slider.Track>
            </>
          )}
        </Slider>
      </div>

      {/* Dark theme example */}
      <div className="bg-gray-12 rounded-lg p-6">
        <Slider
          className="[&_[data-slider-output]]:text-gray-3 [&_[data-slider-track]]:bg-gray-9 [&_[data-slider-fill]]:bg-white [&_[data-slider-label]]:text-white [&_[data-slider-thumb]]:border-white"
          defaultValue={50}
          maxValue={100000}
        >
          {({state}) => (
            <>
              <Slider.Header>
                <Slider.Label>Price</Slider.Label>
                <Slider.Output />
              </Slider.Header>
              <Slider.Track>
                <Slider.Fill percentage={state.getThumbPercent(0) * 100} />
                <Slider.Thumb />
              </Slider.Track>
            </>
          )}
        </Slider>
      </div>
    </div>
  ),
};

export const SingleWithMarks: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);

    return (
      <Slider
        maxValue={100}
        minValue={0}
        step={25}
        value={value}
        onChange={(newValue) => setValue(newValue as number)}
      >
        <Slider.Header>
          <Slider.Label>Title</Slider.Label>
          <Slider.Output />
        </Slider.Header>
        <Slider.Track>
          <Slider.Fill percentage={value} />
          <Slider.Thumb />
        </Slider.Track>
        <Slider.Marks>
          <span>20%</span>
          <span>50%</span>
          <span>80%</span>
        </Slider.Marks>
      </Slider>
    );
  },
};

export const Vertical: Story = {
  decorators: [
    (Story) => (
      <div className="h-64 w-96 p-8">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Slider className="h-full" defaultValue={60} orientation="vertical">
      {({state}) => (
        <>
          <Slider.Label>Volume</Slider.Label>
          <Slider.Output />
          <Slider.Track>
            <Slider.Fill percentage={state.getThumbPercent(0) * 100} />
            <Slider.Thumb />
          </Slider.Track>
        </>
      )}
    </Slider>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <Slider defaultValue={50} maxValue={100} minValue={0} step={10}>
      {({state}) => (
        <>
          <Slider.Header>
            <Slider.Label>Quality</Slider.Label>
            <Slider.Output />
          </Slider.Header>
          <Slider.Track>
            <Slider.Fill percentage={state.getThumbPercent(0) * 100} />
            <Slider.Thumb />
          </Slider.Track>
          <div className="text-gray-11 mt-1 flex justify-between text-xs">
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((mark) => (
              <span key={mark} className="w-0">
                {mark}
              </span>
            ))}
          </div>
        </>
      )}
    </Slider>
  ),
};
