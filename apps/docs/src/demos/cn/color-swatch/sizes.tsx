import {ColorSwatch} from "@heroui/react";

export function ColorSwatchSizes() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch color="#0485F7" size="xs" />
      <ColorSwatch color="#EF4444" size="sm" />
      <ColorSwatch color="#F59E0B" size="md" />
      <ColorSwatch color="#10B981" size="lg" />
      <ColorSwatch color="#D946EF" size="xl" />
    </div>
  );
}
