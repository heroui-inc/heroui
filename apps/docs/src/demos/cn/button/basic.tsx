"use client";

import type {ButtonProps} from "@heroui/react";

import {Button} from "@heroui/react";

export function Basic(props: ButtonProps) {
  return (
    <Button {...props} onPress={() => console.log("按钮已按下")}>
      点我
    </Button>
  );
}
