import {TextAlignCenter, TextAlignJustify, TextAlignLeft, TextAlignRight} from "@gravity-ui/icons";
import {Button, ButtonGroup} from "@heroui/react";

export function Orientation() {
  return (
    <div className="flex items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">横向</span>
        <ButtonGroup orientation="horizontal" variant="tertiary">
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
          <Button isIconOnly aria-label="两端对齐">
            <ButtonGroup.Separator />
            <TextAlignJustify />
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted">纵向</span>
        <ButtonGroup orientation="vertical" variant="tertiary">
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
          <Button isIconOnly aria-label="两端对齐">
            <ButtonGroup.Separator />
            <TextAlignJustify />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
