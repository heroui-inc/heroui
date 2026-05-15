import {Description, Label, NumberField} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField isDisabled defaultValue={1024} minValue={0} name="width">
        <Label>宽度</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>以像素为单位输入宽度</Description>
      </NumberField>
      <NumberField
        isDisabled
        defaultValue={0.5}
        formatOptions={{style: "percent"}}
        maxValue={1}
        minValue={0}
        name="percentage"
        step={0.1}
      >
        <Label>百分比</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>取值须在 0 到 100 之间</Description>
      </NumberField>
    </div>
  );
}
