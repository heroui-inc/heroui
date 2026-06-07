import {ColorSwatch} from "@heroui/react";

export function ColorSwatchShapes() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch color="#0485F7" shape="circle" />
      <ColorSwatch color="#0485F7" shape="square" />
    </div>
  );
}
