import {Label, NumberField} from "@heroui/react";

export function CustomStyles() {
  return (
    <NumberField
      className="w-full max-w-56 gap-1.5"
      defaultValue={128}
      minValue={0}
      name="quantity"
    >
      <Label className="font-medium text-foreground">Quantity</Label>
      <NumberField.Group className="rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-foreground/15 dark:ring-white/10">
        <NumberField.DecrementButton className="text-muted hover:text-foreground" />
        <NumberField.Input className="w-20 font-mono text-sm text-foreground tabular-nums" />
        <NumberField.IncrementButton className="text-muted hover:text-foreground" />
      </NumberField.Group>
    </NumberField>
  );
}
