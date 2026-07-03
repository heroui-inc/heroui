"use client";

import {ColorField, ColorSwatch, Label, parseColor} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorField className="w-64" defaultValue={parseColor("#52525b")} name="brand-color">
      <Label className="font-medium text-foreground">Brand color</Label>
      <ColorField.Group className="rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-foreground/15 dark:ring-white/10">
        <ColorField.Prefix>
          <ColorSwatch className="ring-1 ring-border" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input className="font-mono text-sm text-foreground" />
      </ColorField.Group>
    </ColorField>
  );
}
