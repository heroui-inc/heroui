import {Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly variant="tertiary">
        <Icon icon="gravity-ui:ellipsis" />
      </Button>
      <Button isIconOnly variant="secondary">
        <Icon icon="gravity-ui:gear" />
      </Button>
      <Button isIconOnly variant="danger">
        <Icon icon="gravity-ui:trash-bin" />
      </Button>
    </div>
  );
}
