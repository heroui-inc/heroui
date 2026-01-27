"use client";

import {ColorSwatch} from "@heroui/react";

export function ColorSwatchCustomStyles() {
  const colors = ["#0485F7", "#EF4444", "#F59E0B", "#10B981", "#D946EF"];

  return (
    <div className="flex flex-col gap-8">
      {/* Glow effect */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Glow Effect</span>
        <div className="flex items-center gap-4">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="xl"
              style={({color: c}) => ({
                boxShadow: `0 0 12px 2px ${c.toString("css")}90`,
              })}
            />
          ))}
        </div>
      </div>

      {/* Gradient swatch */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">Gradient</span>
        <div className="flex items-center gap-4">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="xl"
              style={({color: c}) => ({
                background: `linear-gradient(135deg, ${c.toString("css")}, white)`,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
