import {Button, Popover} from "@heroui/react";

export function PopoverPlacement() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div />
      <Popover>
        <Button className="w-full" variant="tertiary">
          Top
        </Button>
        <Popover.Content placement="top">
          <Popover.Dialog>
            <Popover.Arrow />
            <p className="text-sm">Top placement</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <div />

      <Popover>
        <Button className="w-full" variant="tertiary">
          Left
        </Button>
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
        <Button className="w-full" variant="tertiary">
          Right
        </Button>
        <Popover.Content placement="right">
          <Popover.Dialog>
            <Popover.Arrow />
            <p className="text-sm">Right placement</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>

      <div />
      <Popover>
        <Button className="w-full" variant="tertiary">
          Bottom
        </Button>
        <Popover.Content placement="bottom">
          <Popover.Dialog>
            <Popover.Arrow />
            <p className="text-sm">Bottom placement</p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
      <div />
    </div>
  );
}
