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
        <Button isIconOnly aria-label="Align left">
          <TextAlignLeft />
        </Button>
        <Button isIconOnly aria-label="Align center">
          <ButtonGroup.Separator />
          <TextAlignCenter />
        </Button>
        <Button isIconOnly aria-label="Align right">
          <ButtonGroup.Separator />
          <TextAlignRight />
        </Button>
      </ButtonGroup>
    </div>
  );
}
