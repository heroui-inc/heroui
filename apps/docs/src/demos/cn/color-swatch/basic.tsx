import {ColorSwatch} from "@heroui/react";

export function ColorSwatchBasic() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch aria-label="蓝色" color="#0485F7" />
      <ColorSwatch aria-label="红色" color="#EF4444" />
      <ColorSwatch aria-label="琥珀色" color="#F59E0B" />
      <ColorSwatch aria-label="绿色" color="#10B981" />
      <ColorSwatch aria-label="品红" color="#D946EF" />
    </div>
  );
}
