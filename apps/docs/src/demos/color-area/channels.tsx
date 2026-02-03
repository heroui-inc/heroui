import {ColorArea} from "@heroui/react";

export function ColorAreaChannels() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">HSB: Saturation vs Brightness (default)</p>
        <ColorArea defaultValue="hsl(30, 100%, 50%)">
          <ColorArea.Thumb />
        </ColorArea>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">RGB: Red vs Green</p>
        <ColorArea defaultValue="rgb(255, 100, 50)" xChannel="red" yChannel="green">
          <ColorArea.Thumb />
        </ColorArea>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">RGB: Blue vs Green</p>
        <ColorArea defaultValue="rgb(50, 100, 255)" xChannel="blue" yChannel="green">
          <ColorArea.Thumb />
        </ColorArea>
      </div>
    </div>
  );
}
