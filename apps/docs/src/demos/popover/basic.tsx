import {Button, Popover} from "@heroui/react";

export function PopoverBasic() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button>Click me</Button>
        <Popover.Content>
          <Popover.Dialog>
            <Popover.Heading>Popover Title</Popover.Heading>
            <p className="text-muted mt-2 text-sm">
              This is the popover content. You can put any content here.
            </p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
