import {Ellipsis} from "@gravity-ui/icons";
import {Button, Popover} from "@heroui/react";

export function PopoverWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button variant="secondary">带箭头</Button>
        <Popover.Content className="max-w-64">
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>带箭头的弹出层</Popover.Heading>
            <p className="mt-2 text-sm text-muted">箭头指向触发弹出层的元素。</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Popover>
        <Button isIconOnly variant="tertiary">
          <Ellipsis />
        </Button>
        <Popover.Content className="max-w-64" offset={10}>
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>带箭头的弹出层</Popover.Heading>
            <p className="mt-2 text-sm text-muted">箭头指向触发弹出层的元素。</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
