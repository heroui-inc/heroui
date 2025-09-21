"use client";

import {Chip} from "@heroui/react";

export function ChipVariants() {
  const variants = ["primary", "secondary", "tertiary"] as const;
  const types = ["default", "accent", "success", "warning", "danger"] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="sr-only px-4 py-3 text-left text-sm font-medium">Variant / Type</th>
            {types.map((type) => (
              <th
                key={type}
                className="text-muted px-4 py-3 text-center text-sm font-medium capitalize"
              >
                {type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant} className="border-border border-t">
              <td className="text-muted px-4 py-4 text-sm font-medium capitalize">{variant}</td>
              {types.map((type) => (
                <td key={`${variant}-${type}`} className="px-4 py-4 text-center">
                  <Chip type={type} variant={variant}>
                    {type === "default" ? "Default" : type.charAt(0).toUpperCase() + type.slice(1)}
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
