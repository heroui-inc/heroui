"use client";

import {ColorField, ColorSwatch, Label, parseColor} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorField className="w-64" defaultValue={parseColor("#52525b")} name="brand-color">
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Brand color</Label>
      <ColorField.Group className="rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <ColorField.Prefix>
          <ColorSwatch className="ring-1 ring-neutral-300/80 dark:ring-neutral-600" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input className="font-mono text-sm text-neutral-800 dark:text-neutral-100" />
      </ColorField.Group>
    </ColorField>
  );
}
