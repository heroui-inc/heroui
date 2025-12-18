import {Button, ButtonGroup} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">Small</p>
        <ButtonGroup size="sm" variant="secondary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">Medium (default)</p>
        <ButtonGroup size="md" variant="secondary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">Large</p>
        <ButtonGroup size="lg" variant="secondary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
