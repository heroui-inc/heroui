import {Globe, Plus, TrashBin} from "@gravity-ui/icons";
import {Button, ButtonGroup} from "@heroui/react";

export function WithIcons() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">With icons</p>
        <ButtonGroup variant="secondary">
          <Button>
            <Globe />
            Search
          </Button>
          <Button>
            <Plus />
            Add
          </Button>
          <Button>
            <TrashBin />
            Delete
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-muted">Icon only buttons</p>
        <ButtonGroup variant="tertiary">
          <Button isIconOnly>
            <Globe />
          </Button>
          <Button isIconOnly>
            <Plus />
          </Button>
          <Button isIconOnly>
            <TrashBin />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
