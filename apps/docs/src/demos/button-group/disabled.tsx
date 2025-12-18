import {Button, ButtonGroup} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">All buttons disabled</p>
        <ButtonGroup isDisabled>
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">Group disabled, but one button overrides</p>
        <ButtonGroup isDisabled>
          <Button>First</Button>
          <Button>Second</Button>
          <Button isDisabled={false}>Third (enabled)</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
