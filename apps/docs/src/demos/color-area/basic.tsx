import {ColorArea} from "@heroui/react";

export function ColorAreaBasic() {
  return (
    <ColorArea defaultValue="hsl(30, 100%, 50%)">
      <ColorArea.Thumb />
    </ColorArea>
  );
}
