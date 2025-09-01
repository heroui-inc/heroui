"use client";

import {Chip} from "@heroui/react";

export function ChipVariants() {
  const variants = ["primary", "secondary", "tertiary"] as const;
  const colors = ["default", "accent", "success", "warning", "danger"] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="sr-only px-4 py-3 text-left text-sm font-medium">Variant / Color</th>
            {colors.map((color) => (
              <th
                key={color}
                className="text-muted px-4 py-3 text-center text-sm font-medium capitalize"
              >
                {color}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant} className="border-border border-t">
              <td className="text-muted px-4 py-4 text-sm font-medium capitalize">{variant}</td>
              {colors.map((color) => (
                <td key={`${variant}-${color}`} className="px-4 py-4 text-center">
                  <Chip color={color} variant={variant}>
                    {color === "default"
                      ? "Default"
                      : color.charAt(0).toUpperCase() + color.slice(1)}
                  </Chip>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
