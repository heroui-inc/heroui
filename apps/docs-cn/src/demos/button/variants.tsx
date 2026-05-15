import {Button} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>主要</Button>
      <Button variant="secondary">次要</Button>
      <Button variant="tertiary">第三</Button>
      <Button variant="outline">线框</Button>
      <Button variant="ghost">幽灵</Button>
      <Button variant="danger">危险</Button>
      <Button variant="danger-soft">柔和危险</Button>
    </div>
  );
}
