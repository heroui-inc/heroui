import {FieldError, Label, NumberField} from "@heroui/react";

export function Validation() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField isInvalid isRequired minValue={0} name="quantity" value={-5}>
        <Label>Quantity</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <FieldError>Quantity must be greater than or equal to 0</FieldError>
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
        <Label>Percentage</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <FieldError>Percentage must be between 0 and 100</FieldError>
      </NumberField>
    </div>
  );
}
