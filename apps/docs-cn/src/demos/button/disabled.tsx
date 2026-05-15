import {Button} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button isDisabled>主要</Button>
      <Button isDisabled variant="secondary">
        次要
      </Button>
      <Button isDisabled variant="tertiary">
        第三
      </Button>
      <Button isDisabled variant="outline">
        线框
      </Button>
      <Button isDisabled variant="ghost">
        幽灵
      </Button>
      <Button isDisabled variant="danger">
        危险
      </Button>
    </div>
  );
}
