"use client";

import {Button, PopoverContent, PopoverDialog, PopoverHeading, PopoverRoot} from "@heroui/react";

export function PopoverBasic() {
  return (
    <div className="flex items-center gap-4">
      <PopoverRoot>
        <Button>Click me</Button>
        <PopoverContent>
          <PopoverDialog>
            <PopoverHeading>PopoverRoot Title</PopoverHeading>
            <p className="text-muted mt-2 text-sm">
              This is the popover content. You can put any content here.
            </p>
          </PopoverDialog>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
