"use client";

import {Avatar, Description, Label, ListBox, Surface} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomCheckIcon() {
  return (
    <Surface className="shadow-surface w-[256px] rounded-3xl">
      <ListBox aria-label="Users" selectionMode="multiple">
        <ListBox.Item id="1" textValue="Bob">
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
          <ListBox.ItemIndicator>
            {({isSelected}) =>
              isSelected ? <Icon className="text-accent size-4" icon="gravity-ui:check" /> : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
        <ListBox.Item id="2" textValue="Fred">
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
          <ListBox.ItemIndicator>
            {({isSelected}) =>
              isSelected ? <Icon className="text-accent size-4" icon="gravity-ui:check" /> : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
        <ListBox.Item id="3" textValue="Martha">
          <Avatar size="sm">
            <Avatar.Image
              alt="Martha"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
            />
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Martha</Label>
            <Description>martha@heroui.com</Description>
          </div>
          <ListBox.ItemIndicator>
            {({isSelected}) =>
              isSelected ? <Icon className="text-accent size-4" icon="gravity-ui:check" /> : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
      </ListBox>
    </Surface>
  );
}
