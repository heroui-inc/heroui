"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ComboBox,
  Description,
  Input,
  Label,
  ListBox,
} from "@heroui/react";

export function CustomValue() {
  const users = [
    {
      avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
      email: "bob@heroui.com",
      fallback: "B",
      id: "1",
      name: "Bob",
    },
    {
      avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
      email: "fred@heroui.com",
      fallback: "F",
      id: "2",
      name: "Fred",
    },
    {
      avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
      email: "martha@heroui.com",
      fallback: "M",
      id: "3",
      name: "Martha",
    },
    {
      avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
      email: "john@heroui.com",
      fallback: "J",
      id: "4",
      name: "John",
    },
    {
      avatarUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
      email: "jane@heroui.com",
      fallback: "J",
      id: "5",
      name: "Jane",
    },
  ];

  return (
    <ComboBox className="w-[256px]">
      <Label>User</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search users..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          {users.map((user) => (
            <ListBox.Item key={user.id} id={user.id} textValue={user.name}>
              <Avatar size="sm">
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback>{user.fallback}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Label>{user.name}</Label>
                <Description>{user.email}</Description>
              </div>
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}
