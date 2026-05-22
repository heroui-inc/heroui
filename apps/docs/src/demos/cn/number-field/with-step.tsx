import {Description, Label, NumberField} from "@heroui/react";

export function WithStep() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField defaultValue={0} maxValue={100} minValue={0} name="step1" step={1}>
        <Label>步长：1</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>每次增减 1</Description>
      </NumberField>
      <NumberField defaultValue={0} maxValue={100} minValue={0} name="step5" step={5}>
        <Label>步长：5</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>每次增减 5</Description>
      </NumberField>
      <NumberField defaultValue={0} maxValue={100} minValue={0} name="step10" step={10}>
        <Label>步长：10</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>每次增减 10</Description>
      </NumberField>
    </div>
  );
}
