import {Description, Label, NumberField, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-[280px] flex-col gap-4 rounded-3xl p-6">
      <NumberField defaultValue={1024} minValue={0} name="width">
        <Label>Width</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-full" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Enter the width in pixels</Description>
      </NumberField>
      <NumberField
        defaultValue={0.5}
        formatOptions={{style: "percent"}}
        maxValue={1}
        minValue={0}
        name="percentage"
        step={0.1}
      >
        <Label>Percentage</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-full" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Value must be between 0 and 100</Description>
      </NumberField>
    </Surface>
  );
}
