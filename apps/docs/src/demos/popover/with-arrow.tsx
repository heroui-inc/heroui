import {Button, Popover} from "@heroui/react";
import {Icon} from "@iconify/react";

export function PopoverWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button variant="secondary">With Arrow</Button>
        <Popover.Content className="max-w-64">
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>Popover with Arrow</Popover.Heading>
            <p className="text-muted mt-2 text-sm">
              The arrow shows which element triggered the popover.
            </p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Popover>
        <Button isIconOnly variant="tertiary">
          <Icon icon="gravity-ui:ellipsis" />
        </Button>
        <Popover.Content className="max-w-64" offset={10}>
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>Popover with Arrow</Popover.Heading>
            <p className="text-muted mt-2 text-sm">
              The arrow shows which element triggered the popover.
            </p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
