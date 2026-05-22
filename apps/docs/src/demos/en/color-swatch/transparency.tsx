import {ColorSwatch} from "@heroui/react";

export function ColorSwatchTransparency() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch aria-label="100% opacity" color="rgba(4, 133, 247, 1)" />
      <ColorSwatch aria-label="75% opacity" color="rgba(4, 133, 247, 0.75)" />
      <ColorSwatch aria-label="50% opacity" color="rgba(4, 133, 247, 0.5)" />
      <ColorSwatch aria-label="25% opacity" color="rgba(4, 133, 247, 0.25)" />
      <ColorSwatch aria-label="0% opacity" color="rgba(4, 133, 247, 0)" />
    </div>
  );
}
