"use client";

import {ColorSwatch} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch
        aria-label="Blue"
        color="#0485F7"
        render={(props) => <div {...props} data-custom="blue" />}
      />
      <ColorSwatch
        aria-label="Red"
        color="#EF4444"
        render={(props) => <div {...props} data-custom="red" />}
      />
      <ColorSwatch
        aria-label="Amber"
        color="#F59E0B"
        render={(props) => <div {...props} data-custom="amber" />}
      />
      <ColorSwatch
        aria-label="Green"
        color="#10B981"
        render={(props) => <div {...props} data-custom="green" />}
      />
      <ColorSwatch
        aria-label="Fuchsia"
        color="#D946EF"
        render={(props) => <div {...props} data-custom="fuchsia" />}
      />
    </div>
  );
}
