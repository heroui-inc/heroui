import {ColorArea} from "@heroui/react";

export function CustomStyles() {
  return (
    <ColorArea className="size-44 rounded-3xl" defaultValue="rgb(116, 52, 255)">
      <ColorArea.Thumb className="size-5 rounded-full border-4 border-white" />
    </ColorArea>
  );
}
