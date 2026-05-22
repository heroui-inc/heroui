import {TextAlignCenter, TextAlignLeft, TextAlignRight} from "@gravity-ui/icons";
import {Button, ButtonGroup} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <ButtonGroup fullWidth>
        <Button>第一项</Button>
        <Button>
          <ButtonGroup.Separator />
          第二项
        </Button>
        <Button>
          <ButtonGroup.Separator />
          第三项
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
