import {Label, NumberField} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <NumberField defaultValue={100} minValue={0} name="primary-width" variant="primary">
        <Label>主要变体</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>
      <NumberField defaultValue={100} minValue={0} name="secondary-width" variant="secondary">
        <Label>次要变体</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>
    </div>
  );
}
