import {Button} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex items-center gap-3">
      <Button size="sm">小</Button>
      <Button size="md">中</Button>
      <Button size="lg">大</Button>
    </div>
  );
}
