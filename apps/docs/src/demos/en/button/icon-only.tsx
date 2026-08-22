import {Ellipsis, Gear, TrashBin} from "@gravity-ui/icons";
import {Button} from "@heroui/react";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly aria-label="More options" variant="tertiary">
        <Ellipsis />
      </Button>
      <Button isIconOnly aria-label="Settings" variant="secondary">
        <Gear />
      </Button>
      <Button isIconOnly aria-label="Delete" variant="danger">
        <TrashBin />
      </Button>
    </div>
  );
}
