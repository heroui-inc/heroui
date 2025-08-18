"use client";

import {Popover, Button} from "@heroui/react";

export function PopoverPlacement() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div></div>
      <Popover>
        <Button variant="tertiary" className="w-full">Top</Button>
        <Popover.Content placement="top">
          <Popover.Dialog>
            <Popover.Arrow />
            <p className="text-sm">Top placement</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <div></div>

      <Popover>
        <Button variant="tertiary" className="w-full">Left</Button>
        <Popover.Content placement="left">
          <Popover.Dialog>
            <Popover.Arrow />
            <p className="text-sm">Left placement</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      
      <div className="flex items-center justify-center">
        <span className="text-muted text-sm">Click buttons</span>
      </div>

      <Popover>
        <Button variant="tertiary" className="w-full">Right</Button>
        <Popover.Content placement="right">
          <Popover.Dialog>
            <Popover.Arrow />
            <p className="text-sm">Right placement</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <div></div>
      <Popover>
        <Button variant="tertiary" className="w-full">Bottom</Button>
        <Popover.Content placement="bottom">
          <Popover.Dialog>
            <Popover.Arrow />
            <p className="text-sm">Bottom placement</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <div></div>
    </div>
  );
}