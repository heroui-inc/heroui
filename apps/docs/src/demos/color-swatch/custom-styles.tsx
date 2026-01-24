"use client";

import {ColorSwatch} from "@heroui/react";

export function ColorSwatchCustomStyles() {
  const colors = ["#0485F7", "#EF4444", "#F59E0B", "#10B981", "#D946EF"];

  return (
    <div className="flex flex-col gap-6">
      {/* Custom border using render props */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Custom Ring</span>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="lg"
              style={({color: c}) => ({
                boxShadow: `0 0 0 3px ${c.toString("css")}40`,
              })}
            />
          ))}
        </div>
      </div>

      {/* Custom shadow using render props */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Custom Shadow</span>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="lg"
              style={({color: c}) => ({
                boxShadow: `0 4px 14px ${c.toString("css")}80`,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
