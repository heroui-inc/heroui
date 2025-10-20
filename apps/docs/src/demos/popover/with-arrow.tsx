"use client";

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
} from "@heroui/react";
import {Icon} from "@iconify/react";

export function PopoverWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button variant="secondary">With Arrow</Button>
        <PopoverContent>
          <PopoverDialog>
            <PopoverArrow />
            <PopoverHeading>Popover with Arrow</PopoverHeading>
            <p className="text-muted mt-2 text-sm">
              The arrow shows which element triggered the popover.
            </p>
          </PopoverDialog>
        </PopoverContent>
      </Popover>

      <Popover>
        <Button isIconOnly variant="tertiary">
          <Icon icon="gravity-ui:ellipsis" />
        </Button>
        <PopoverContent offset={10}>
          <PopoverDialog>
            <PopoverArrow />
            <PopoverHeading>Popover with Arrow</PopoverHeading>
            <p className="text-muted mt-2 text-sm">
              The arrow shows which element triggered the popover.
            </p>
          </PopoverDialog>
        </PopoverContent>
      </Popover>
    </div>
  );
}
