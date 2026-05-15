import {FieldError, Label, NumberField} from "@heroui/react";

export function Validation() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField isInvalid isRequired minValue={0} name="quantity" value={-5}>
        <Label>数量</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <FieldError>数量必须大于或等于 0</FieldError>
      </NumberField>
      <NumberField
        isInvalid
        formatOptions={{style: "percent"}}
        maxValue={1}
        minValue={0}
        name="percentage"
        step={0.1}
        value={1.5}
      >
        <Label>百分比</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <FieldError>百分比必须在 0 到 100 之间</FieldError>
      </NumberField>
    </div>
  );
}
