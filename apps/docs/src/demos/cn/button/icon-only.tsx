import {Ellipsis, Gear, TrashBin} from "@gravity-ui/icons";
import {Button} from "@heroui/react";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly aria-label="更多选项" variant="tertiary">
        <Ellipsis />
      </Button>
      <Button isIconOnly aria-label="设置" variant="secondary">
        <Gear />
      </Button>
      <Button isIconOnly aria-label="删除" variant="danger">
        <TrashBin />
      </Button>
    </div>
  );
}
