import {Button, ButtonGroup} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Primary</p>
        <ButtonGroup variant="primary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Secondary</p>
        <ButtonGroup variant="secondary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Tertiary</p>
        <ButtonGroup variant="tertiary">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Outline</p>
        <ButtonGroup variant="outline">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Ghost</p>
        <ButtonGroup variant="ghost">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Danger</p>
        <ButtonGroup variant="danger">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
