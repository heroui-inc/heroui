"use client";

import type {ButtonProps} from "@heroui/react";

import {Button} from "@heroui/react";

export function Basic(props: ButtonProps) {
  return (
    <Button {...props} onPress={() => console.log("Button pressed")}>
      Click me
    </Button>
  );
}
