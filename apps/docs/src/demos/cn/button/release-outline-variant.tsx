import {Button, ButtonGroup} from "@heroui/react";

export function OutlineVariant() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">按钮</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">线框</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">按钮组</p>
        <ButtonGroup variant="outline">
          <Button>第一项</Button>
          <Button>第二项</Button>
          <Button>第三项</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
