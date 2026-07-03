import {Avatar, Description, Label, ListBox} from "@heroui/react";

const itemClass =
  "rounded-lg data-[focused=true]:bg-neutral-100/80 data-[selected=true]:font-medium data-[selected=true]:text-neutral-900 dark:data-[focused=true]:bg-neutral-800/80 dark:data-[selected=true]:text-neutral-100";

export function CustomStyles() {
  return (
    <ListBox
      aria-label="Users"
      className="w-[220px] rounded-xl border border-border/80 bg-surface p-1 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      selectionMode="single"
    >
      <ListBox.Item className={itemClass} id="1" textValue="Bob">
        <Avatar size="sm">
          <Avatar.Image
            alt="Bob"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
          />
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>Bob</Label>
          <Description>bob@heroui.com</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item className={itemClass} id="2" textValue="Fred">
        <Avatar size="sm">
          <Avatar.Image
            alt="Fred"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
          />
          <Avatar.Fallback>F</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>Fred</Label>
          <Description>fred@heroui.com</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  );
}
