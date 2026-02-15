import {Label, NumberField} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <NumberField
      className="w-full max-w-64"
      defaultValue={1024}
      minValue={0}
      name="width"
      render={(props) => <div {...props} data-custom="foo" />}
    >
      <Label>Width</Label>
      <NumberField.Group>
        <NumberField.DecrementButton />
        <NumberField.Input className="w-[120px]" />
        <NumberField.IncrementButton />
      </NumberField.Group>
    </NumberField>
  );
}
