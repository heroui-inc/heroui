"use client";

import type {ColorAreaProps} from "@heroui/react";

import {ColorArea} from "@heroui/react";

export function ColorAreaBasic(props: ColorAreaProps) {
  return (
    <ColorArea {...props} defaultValue="rgb(116, 52, 255)">
      <ColorArea.Thumb />
    </ColorArea>
  );
}
