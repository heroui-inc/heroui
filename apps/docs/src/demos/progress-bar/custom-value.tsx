"use client";

import {Label, ListBox, NumberField, ProgressBar, Select, Separator} from "@heroui/react";
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
    <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:gap-10">
      <div className="flex w-full max-w-md flex-1 justify-center">
        <ProgressBar
          aria-label="Revenue"
          className="w-full max-w-52"
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
      </div>

      <Separator className="md:hidden" />
      <Separator className="hidden md:block" orientation="vertical" />

      <div className="flex max-w-52 flex-col gap-3">
        <Label className="text-xs font-medium text-muted">Options</Label>

        <NumberField
          maxValue={maxValue}
          minValue={minValue}
          value={value}
          variant="secondary"
          onChange={(v) => setValue(v)}
        >
          <Label>Value</Label>
          <NumberField.Group>
            <NumberField.DecrementButton />
            <NumberField.Input />
            <NumberField.IncrementButton />
          </NumberField.Group>
        </NumberField>

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
