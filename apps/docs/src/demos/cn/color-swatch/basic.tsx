"use client";

import type {ColorSwatchProps} from "@heroui/react";

import {ColorSwatch} from "@heroui/react";

export function ColorSwatchBasic(props: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch {...props} aria-label="蓝色" color="#0485F7" />
      <ColorSwatch {...props} aria-label="红色" color="#EF4444" />
      <ColorSwatch {...props} aria-label="琥珀色" color="#F59E0B" />
      <ColorSwatch {...props} aria-label="绿色" color="#10B981" />
      <ColorSwatch {...props} aria-label="品红" color="#D946EF" />
    </div>
  );
}
