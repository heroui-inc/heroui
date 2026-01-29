"use client";

import type {Color} from "react-aria-components";

import {
  Button,
  ColorField,
  ColorInputGroup,
  ColorSwatch,
  Description,
  Label,
  parseColor,
} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [value, setValue] = useState<Color | null>(parseColor("#0485F7"));

  return (
    <div className="flex flex-col gap-4">
      <ColorField className="w-[280px]" name="color" value={value} onChange={setValue}>
        <Label>Color</Label>
        <ColorInputGroup>
          <ColorInputGroup.Prefix>
            <ColorSwatch color={value ?? undefined} size="xs" />
          </ColorInputGroup.Prefix>
          <ColorInputGroup.Input />
        </ColorInputGroup>
        <Description>Current value: {value ? value.toString("hex") : "(empty)"}</Description>
      </ColorField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue(parseColor("#EF4444"))}>
          Set Red
        </Button>
        <Button variant="tertiary" onPress={() => setValue(parseColor("#10B981"))}>
          Set Green
        </Button>
        <Button variant="tertiary" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
}
