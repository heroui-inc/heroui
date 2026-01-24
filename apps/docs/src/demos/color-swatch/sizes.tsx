import {ColorSwatch} from "@heroui/react";

export function ColorSwatchSizes() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch color="#0485F7" size="xs" />
      <ColorSwatch color="#0485F7" size="sm" />
      <ColorSwatch color="#0485F7" size="md" />
      <ColorSwatch color="#0485F7" size="lg" />
      <ColorSwatch color="#0485F7" size="xl" />
    </div>
  );
}
