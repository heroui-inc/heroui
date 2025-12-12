import {Button, Popover} from "@heroui/react";

export function PopoverBasic() {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <Button>Click me</Button>
        <Popover.Content className="max-w-64">
          <Popover.Dialog>
            <Popover.Heading>Popover Title</Popover.Heading>
            <p className="mt-2 text-sm text-muted">
              This is the popover content. You can put any content here.
            </p>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}
