import {Button, Dropdown, Label} from "@heroui/react";

const itemClass = "rounded-md data-[focused=true]:bg-muted/60 data-[focused=true]:text-foreground";

export function CustomStyles() {
  return (
    <Dropdown>
      <Button
        aria-label="Project actions"
        className="border border-border/80 bg-surface font-medium text-foreground shadow-sm ring-1 ring-black/5 hover:bg-muted/40 dark:ring-white/10"
        variant="secondary"
      >
        Actions
      </Button>
      <Dropdown.Popover className="rounded-xl border border-border/80 bg-surface p-1 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
        <Dropdown.Menu>
          <Dropdown.Item className={itemClass} id="rename" textValue="Rename">
            <Label>Rename</Label>
          </Dropdown.Item>
          <Dropdown.Item className={itemClass} id="duplicate" textValue="Duplicate">
            <Label>Duplicate</Label>
          </Dropdown.Item>
          <Dropdown.Item className={itemClass} id="archive" textValue="Archive">
            <Label>Archive</Label>
          </Dropdown.Item>
          <Dropdown.Item
            className="rounded-md data-[focused=true]:bg-danger/10 data-[focused=true]:text-danger"
            id="delete"
            textValue="Delete"
            variant="danger"
          >
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
