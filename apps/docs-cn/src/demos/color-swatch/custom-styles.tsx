"use client";

import {ColorSwatch} from "@heroui/react";

export function ColorSwatchCustomStyles() {
  const colors = ["#0485F7", "#EF4444", "#F59E0B", "#10B981", "#D946EF"];

  return (
    <div className="flex flex-col gap-8">
      {/* 发光效果 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">发光效果</span>
        <div className="flex items-center gap-4">
          {colors.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              size="xl"
              style={() => ({
                boxShadow: `0 0 20px 2px ${color}`,
              })}
            />
          ))}
        </div>
      </div>

      {/* 渐变色块 */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">渐变</span>
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
