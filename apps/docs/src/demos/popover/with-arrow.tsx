"use client";

import {Popover, Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function PopoverWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button variant="secondary">
          With Arrow
        </Button>
        <Popover.Content>
          <Popover.Dialog>
            <Popover.Arrow />
            <Popover.Heading>Popover with Arrow</Popover.Heading>
            <p className="text-muted mt-2 text-sm">
              The arrow helps indicate which element triggered the popover.
            </p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <Popover>
        <Button isIconOnly variant="tertiary">
          <Icon icon="gravity-ui:ellipsis" />
        </Button>
        <Popover.Content offset={10}>
          <Popover.Dialog>
            <Popover.Arrow />
            <div className="flex flex-col gap-1">
              <button className="hover:bg-surface rounded px-3 py-2 text-left text-sm">Edit</button>
              <button className="hover:bg-surface rounded px-3 py-2 text-left text-sm">Duplicate</button>
              <button className="hover:bg-surface rounded px-3 py-2 text-left text-sm">Archive</button>
              <hr className="my-1" />
              <button className="text-danger hover:bg-danger/10 rounded px-3 py-2 text-left text-sm">Delete</button>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}