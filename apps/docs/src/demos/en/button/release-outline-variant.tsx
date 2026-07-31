import {Button, ButtonGroup} from "@heroui/react";

export function OutlineVariant() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Button</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Outline</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">ButtonGroup</p>
        <ButtonGroup variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
