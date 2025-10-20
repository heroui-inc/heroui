"use client";

import {Button, Popover, PopoverContent, PopoverDialog, PopoverHeading} from "@heroui/react";

export function PopoverBasic() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button>Click me</Button>
        <PopoverContent>
          <PopoverDialog>
            <PopoverHeading>Popover Title</PopoverHeading>
            <p className="text-muted mt-2 text-sm">
              This is the popover content. You can put any content here.
            </p>
          </PopoverDialog>
        </PopoverContent>
      </Popover>
    </div>
  );
}
