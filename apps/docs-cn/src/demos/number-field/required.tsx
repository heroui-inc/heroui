import {Description, Label, NumberField} from "@heroui/react";

export function Required() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField isRequired minValue={0} name="quantity">
        <Label>Quantity</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>
      <NumberField isRequired defaultValue={1} maxValue={10} minValue={1} name="rating">
        <Label>Rating</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Rate from 1 to 10</Description>
      </NumberField>
    </div>
  );
}
