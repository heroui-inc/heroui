import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {
  Slider,
  SliderFill,
  SliderHeader,
  SliderLabel,
  SliderMarks,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "./index";

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
  title: "📝 ToDo/Slider",
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => (
    <Slider defaultValue={50} {...args}>
      {({state}) => (
        <>
          <SliderHeader>
            <SliderLabel>Title</SliderLabel>
            <SliderOutput />
          </SliderHeader>
          <SliderTrack>
            <SliderFill percentage={state.getThumbPercent(0) * 100} />
            <SliderThumb />
          </SliderTrack>
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
          <SliderHeader>
            <SliderLabel>Title</SliderLabel>
            <SliderOutput />
          </SliderHeader>
          <SliderTrack>
            <SliderFill percentage={state.getThumbPercent(0) * 100} />
            <SliderThumb />
          </SliderTrack>
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
          <SliderHeader>
            <SliderLabel>Title</SliderLabel>
            <SliderOutput />
          </SliderHeader>
          <SliderTrack>
            <SliderFill percentage={state.getThumbPercent(0) * 100} />
            <SliderThumb />
          </SliderTrack>
          <SliderMarks>
            <span>20%</span>
            <span>50%</span>
            <span>80%</span>
          </SliderMarks>
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
        <SliderHeader>
          <SliderLabel>Title</SliderLabel>
          <SliderOutput />
        </SliderHeader>
        <SliderTrack>
          <SliderFill
            style={{
              left: `${value[0] ?? 0}%`,
              width: `${(value[1] ?? 0) - (value[0] ?? 0)}%`,
            }}
          />
          <SliderThumb index={0} />
          <SliderThumb index={1} />
        </SliderTrack>
        <SliderMarks>
          <span>20%</span>
          <span>50%</span>
          <span>80%</span>
        </SliderMarks>
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
          <SliderHeader>
            <SliderLabel>Price</SliderLabel>
            <SliderOutput />
          </SliderHeader>
          <SliderTrack>
            <SliderFill percentage={value} />
            <SliderThumb />
          </SliderTrack>
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
              <SliderHeader>
                <SliderLabel>Price</SliderLabel>
                <SliderOutput />
              </SliderHeader>
              <SliderTrack>
                <SliderFill percentage={state.getThumbPercent(0) * 100} />
                <SliderThumb />
              </SliderTrack>
            </>
          )}
        </Slider>
      </div>

      {/* Dark theme example */}
      <div className="bg-gray-12 rounded-lg p-6">
        <Slider
          className="[&_[data-slot=slider-output]]:text-gray-3 [&_[data-slot=slider-track]]:bg-gray-9 [&_[data-slot=slider-fill]]:bg-white [&_[data-slot=slider-label]]:text-white [&_[data-slot=slider-thumb]]:border-white"
          defaultValue={50}
          maxValue={100000}
        >
          {({state}) => (
            <>
              <SliderHeader>
                <SliderLabel>Price</SliderLabel>
                <SliderOutput />
              </SliderHeader>
              <SliderTrack>
                <SliderFill percentage={state.getThumbPercent(0) * 100} />
                <SliderThumb />
              </SliderTrack>
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
        <SliderHeader>
          <SliderLabel>Title</SliderLabel>
          <SliderOutput />
        </SliderHeader>
        <SliderTrack>
          <SliderFill percentage={value} />
          <SliderThumb />
        </SliderTrack>
        <SliderMarks>
          <span>20%</span>
          <span>50%</span>
          <span>80%</span>
        </SliderMarks>
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
          <SliderLabel>Volume</SliderLabel>
          <SliderOutput />
          <SliderTrack>
            <SliderFill percentage={state.getThumbPercent(0) * 100} />
            <SliderThumb />
          </SliderTrack>
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
          <SliderHeader>
            <SliderLabel>Quality</SliderLabel>
            <SliderOutput />
          </SliderHeader>
          <SliderTrack>
            <SliderFill percentage={state.getThumbPercent(0) * 100} />
            <SliderThumb />
          </SliderTrack>
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
