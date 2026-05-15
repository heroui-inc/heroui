import {Description, Label, NumberField, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-[280px] flex-col gap-4 rounded-3xl p-6">
      <NumberField defaultValue={1024} minValue={0} name="width" variant="secondary">
        <Label>宽度</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-full" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>以像素为单位输入宽度</Description>
      </NumberField>
      <NumberField
        defaultValue={0.5}
        formatOptions={{style: "percent"}}
        maxValue={1}
        minValue={0}
        name="percentage"
        step={0.1}
        variant="secondary"
      >
        <Label>百分比</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-full" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>取值须在 0 到 100 之间</Description>
      </NumberField>
    </Surface>
  );
}
