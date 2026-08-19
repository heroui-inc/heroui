"use client";

import {Button} from "@heroui/react";

export function RenderFunction() {
  return (
    <Button
      render={(props, {isPressed}) => (
        <button {...props} data-custom={isPressed ? "pressed" : "bar"} />
      )}
    >
      点按
    </Button>
  );
}
