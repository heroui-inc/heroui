import {Ellipsis, Gear, TrashBin} from "@gravity-ui/icons";
import {Button} from "@heroui/react";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly variant="tertiary" aria-label="More options">
        <Ellipsis />
      </Button>
      <Button isIconOnly variant="secondary" aria-label="Settings">
        <Gear />
      </Button>
      <Button isIconOnly variant="danger" aria-label="Delete">
        <TrashBin />
      </Button>
    </div>
  );
}
