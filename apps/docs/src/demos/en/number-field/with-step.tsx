import {Description, Label, NumberField} from "@heroui/react";

export function WithStep() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField defaultValue={0} maxValue={100} minValue={0} name="step1" step={1}>
        <Label>Step: 1</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Increments by 1</Description>
      </NumberField>
      <NumberField defaultValue={0} maxValue={100} minValue={0} name="step5" step={5}>
        <Label>Step: 5</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Increments by 5</Description>
      </NumberField>
      <NumberField defaultValue={0} maxValue={100} minValue={0} name="step10" step={10}>
        <Label>Step: 10</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>Increments by 10</Description>
      </NumberField>
    </div>
  );
}
