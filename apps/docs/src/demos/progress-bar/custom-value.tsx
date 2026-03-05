"use client";

import {Label, ListBox, NumberField, ProgressBar, Select, Separator, Slider} from "@heroui/react";
import {useState} from "react";

const formatStyleOptions: {label: string; value: string}[] = [
  {label: "Currency", value: "currency"},
  {label: "Percent", value: "percent"},
  {label: "Decimal", value: "decimal"},
  {label: "Unit", value: "unit"},
];

const formatOptionsMap: Record<string, Intl.NumberFormatOptions> = {
  currency: {currency: "USD", style: "currency"},
  decimal: {style: "decimal"},
  percent: {style: "percent"},
  unit: {style: "unit", unit: "mile"},
};

export function CustomValue() {
  const [value, setValue] = useState(750);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [format, setFormat] = useState<string>("percent");

  return (
    <div className="flex w-full flex-col gap-4">
      <ProgressBar
        aria-label="Revenue"
        className="w-full max-w-md"
        formatOptions={formatOptionsMap[format]}
        maxValue={maxValue}
        minValue={minValue}
        value={value}
      >
        <Label>Progress</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>

      <Separator className="my-5" />

      <div className="flex max-w-72 flex-col gap-3">
        <Label className="text-xs font-medium text-muted">Options</Label>

        <Slider
          maxValue={maxValue}
          minValue={minValue}
          value={value}
          onChange={(v) => setValue(v as number)}
        >
          <Label>Value</Label>
          <Slider.Output />
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>

        <NumberField
          maxValue={maxValue - 1}
          minValue={0}
          value={minValue}
          variant="secondary"
          onChange={(v) => {
            setMinValue(v);
            if (value < v) setValue(v);
          }}
        >
          <Label>Min Value</Label>
          <NumberField.Group>
            <NumberField.DecrementButton />
            <NumberField.Input />
            <NumberField.IncrementButton />
          </NumberField.Group>
        </NumberField>

        <NumberField
          maxValue={2000}
          minValue={minValue + 1}
          value={maxValue}
          variant="secondary"
          onChange={(v) => {
            setMaxValue(v);
            if (value > v) setValue(v);
          }}
        >
          <Label>Max Value</Label>
          <NumberField.Group>
            <NumberField.DecrementButton />
            <NumberField.Input />
            <NumberField.IncrementButton />
          </NumberField.Group>
        </NumberField>

        <Select value={format} variant="secondary" onChange={(key) => setFormat(key as string)}>
          <Label>Format</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {formatStyleOptions.map((option) => (
                <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
                  {option.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
