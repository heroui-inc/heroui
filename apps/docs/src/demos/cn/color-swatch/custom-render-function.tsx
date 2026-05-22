"use client";

import {ColorSwatch} from "@heroui/react";

export function CustomRenderFunction() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch
        aria-label="蓝色"
        color="#0485F7"
        render={(props) => <div {...props} data-custom="blue" />}
      />
      <ColorSwatch
        aria-label="红色"
        color="#EF4444"
        render={(props) => <div {...props} data-custom="red" />}
      />
      <ColorSwatch
        aria-label="琥珀色"
        color="#F59E0B"
        render={(props) => <div {...props} data-custom="amber" />}
      />
      <ColorSwatch
        aria-label="绿色"
        color="#10B981"
        render={(props) => <div {...props} data-custom="green" />}
      />
      <ColorSwatch
        aria-label="品红"
        color="#D946EF"
        render={(props) => <div {...props} data-custom="fuchsia" />}
      />
    </div>
  );
}
