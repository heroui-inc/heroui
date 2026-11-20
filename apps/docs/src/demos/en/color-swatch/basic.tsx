"use client";

import type {ColorSwatchProps} from "@heroui/react";

import {ColorSwatch} from "@heroui/react";

export function ColorSwatchBasic(props: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch {...props} aria-label="Blue" color="#0485F7" />
      <ColorSwatch {...props} aria-label="Red" color="#EF4444" />
      <ColorSwatch {...props} aria-label="Amber" color="#F59E0B" />
      <ColorSwatch {...props} aria-label="Green" color="#10B981" />
      <ColorSwatch {...props} aria-label="Fuchsia" color="#D946EF" />
    </div>
  );
}
