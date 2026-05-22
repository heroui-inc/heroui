import {ColorSwatch} from "@heroui/react";

export function ColorSwatchTransparency() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch aria-label="100% 不透明度" color="rgba(4, 133, 247, 1)" />
      <ColorSwatch aria-label="75% 不透明度" color="rgba(4, 133, 247, 0.75)" />
      <ColorSwatch aria-label="50% 不透明度" color="rgba(4, 133, 247, 0.5)" />
      <ColorSwatch aria-label="25% 不透明度" color="rgba(4, 133, 247, 0.25)" />
      <ColorSwatch aria-label="0% 不透明度" color="rgba(4, 133, 247, 0)" />
    </div>
  );
}
