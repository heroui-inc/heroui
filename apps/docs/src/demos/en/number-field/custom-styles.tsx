import {Label, NumberField} from "@heroui/react";

export function CustomStyles() {
  return (
    <NumberField
      className="w-full max-w-48"
      defaultValue={2}
      minValue={1}
      name="guests"
      variant="secondary"
    >
      <Label className="font-medium text-foreground">Guests</Label>
      <NumberField.Group className="rounded-xl bg-default">
        <NumberField.DecrementButton className="text-muted hover:text-foreground" />
        <NumberField.Input className="text-center tabular-nums" />
        <NumberField.IncrementButton className="text-muted hover:text-foreground" />
      </NumberField.Group>
    </NumberField>
  );
}
