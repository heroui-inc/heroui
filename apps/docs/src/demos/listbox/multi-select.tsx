import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Description,
  Label,
  ListBox,
  Surface,
} from "@heroui/react";

export function MultiSelect() {
  return (
    <Surface className="shadow-surface w-[256px] rounded-3xl">
      <ListBox aria-label="Users" selectionMode="multiple">
        <ListBox.Item id="1" textValue="Bob">
          <Avatar size="sm">
            <AvatarImage src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Bob</Label>
            <Description>bob@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="2" textValue="Fred">
          <Avatar size="sm">
            <AvatarImage src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg" />
            <AvatarFallback>F</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Fred</Label>
            <Description>fred@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="3" textValue="Martha">
          <Avatar size="sm">
            <AvatarImage src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Martha</Label>
            <Description>martha@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator />
        </ListBox.Item>
      </ListBox>
    </Surface>
  );
}
