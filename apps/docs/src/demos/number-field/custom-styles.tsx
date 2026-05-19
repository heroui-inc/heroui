import {Label, NumberField} from "@heroui/react";

export function CustomStyles() {
  return (
    <NumberField
      className="w-full max-w-56 gap-1.5"
      defaultValue={128}
      minValue={0}
      name="quantity"
    >
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Quantity</Label>
      <NumberField.Group className="rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-neutral-400/25 dark:ring-white/10 dark:focus-within:ring-neutral-500/30">
        <NumberField.DecrementButton className="text-muted hover:text-neutral-800 dark:hover:text-neutral-100" />
        <NumberField.Input className="w-20 font-mono text-sm text-neutral-800 tabular-nums dark:text-neutral-100" />
        <NumberField.IncrementButton className="text-muted hover:text-neutral-800 dark:hover:text-neutral-100" />
      </NumberField.Group>
    </NumberField>
  );
}
