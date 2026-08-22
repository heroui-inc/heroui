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
        <Button isIconOnly aria-label="左对齐">
          <TextAlignLeft />
        </Button>
        <Button isIconOnly aria-label="居中对齐">
          <ButtonGroup.Separator />
          <TextAlignCenter />
        </Button>
        <Button isIconOnly aria-label="右对齐">
          <ButtonGroup.Separator />
          <TextAlignRight />
        </Button>
      </ButtonGroup>
    </div>
  );
}
