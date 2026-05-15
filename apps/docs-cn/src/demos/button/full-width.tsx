import {Plus} from "@gravity-ui/icons";
import {Button} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <Button fullWidth>主要按钮</Button>
      <Button fullWidth>
        <Plus />
        带图标
      </Button>
    </div>
  );
}
