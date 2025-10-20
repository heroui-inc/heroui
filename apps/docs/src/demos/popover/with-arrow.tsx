"use client";

import {
  Button,
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverRoot,
} from "@heroui/react";
import {Icon} from "@iconify/react";

export function PopoverWithArrow() {
  return (
    <div className="flex items-center gap-4">
      <PopoverRoot>
        <Button variant="secondary">With Arrow</Button>
        <PopoverContent>
          <PopoverDialog>
            <PopoverArrow />
            <PopoverHeading>PopoverRoot with Arrow</PopoverHeading>
            <p className="text-muted mt-2 text-sm">
              The arrow shows which element triggered the popover.
            </p>
          </PopoverDialog>
        </PopoverContent>
      </PopoverRoot>

      <PopoverRoot>
        <Button isIconOnly variant="tertiary">
          <Icon icon="gravity-ui:ellipsis" />
        </Button>
        <PopoverContent offset={10}>
          <PopoverDialog>
            <PopoverArrow />
            <PopoverHeading>PopoverRoot with Arrow</PopoverHeading>
            <p className="text-muted mt-2 text-sm">
              The arrow shows which element triggered the popover.
            </p>
          </PopoverDialog>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
