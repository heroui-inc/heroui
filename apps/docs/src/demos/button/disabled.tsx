import {Button} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex gap-3">
      <Button isDisabled>Primary</Button>
      <Button isDisabled variant="secondary">
        Secondary
      </Button>
      <Button isDisabled variant="tertiary">
        Tertiary
      </Button>
      <Button isDisabled variant="ghost">
        Ghost
      </Button>
      <Button isDisabled variant="danger">
        Danger
      </Button>
    </div>
  );
}
