import {TextAlignCenter, TextAlignLeft, TextAlignRight} from "@gravity-ui/icons";
import {Button, ButtonGroup} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <ButtonGroup fullWidth>
        <Button>First</Button>
        <Button>
          <ButtonGroup.Separator />
          Second
        </Button>
        <Button>
          <ButtonGroup.Separator />
          Third
        </Button>
      </ButtonGroup>
      <ButtonGroup fullWidth>
        <Button isIconOnly>
          <TextAlignLeft />
        </Button>
        <Button isIconOnly>
          <ButtonGroup.Separator />
          <TextAlignCenter />
        </Button>
        <Button isIconOnly>
          <ButtonGroup.Separator />
          <TextAlignRight />
        </Button>
      </ButtonGroup>
    </div>
  );
}
