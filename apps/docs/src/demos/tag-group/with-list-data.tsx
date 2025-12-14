"use client";

import type {Key} from "@heroui/react";

import {Avatar, Description, EmptyState, Label, Tag, TagGroup, useListData} from "@heroui/react";

export function TagGroupWithListData() {
  type User = {
    id: string;
    name: string;
    avatar: string;
    fallback: string;
  };

  const list = useListData<User>({
    getKey: (item) => item.id,
    initialItems: [
      {
        avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
        fallback: "F",
        id: "fred",
        name: "Fred",
      },
      {
        avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
        fallback: "M",
        id: "michael",
        name: "Michael",
      },
      {
        avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
        fallback: "J",
        id: "jane",
        name: "Jane",
      },
      {
        avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
        fallback: "A",
        id: "alice",
        name: "Alice",
      },
      {
        avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
        fallback: "B",
        id: "bob",
        name: "Bob",
      },
      {
        avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
        fallback: "C",
        id: "charlie",
        name: "Charlie",
      },
    ],
    initialSelectedKeys: new Set(["fred", "michael"]),
  });

  const onRemove = (keys: Set<Key>) => {
    list.remove(...keys);
  };

  return (
    <div className="w-sm">
      <TagGroup
        selectedKeys={list.selectedKeys}
        selectionMode="multiple"
        onRemove={onRemove}
        onSelectionChange={(keys) => list.setSelectedKeys(keys)}
      >
        <Label>Team Members</Label>
        <TagGroup.List
          items={list.items}
          renderEmptyState={() => <EmptyState className="p-1">No team members</EmptyState>}
        >
          {(user) => (
            <Tag key={user.id} id={user.id} textValue={user.name}>
              <Avatar className="size-4" size="sm">
                <Avatar.Image src={user.avatar} />
                <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
              </Avatar>
              {user.name}
            </Tag>
          )}
        </TagGroup.List>
        <Description>Select team members for your project</Description>
      </TagGroup>
      {list.selectedKeys !== "all" && Array.from(list.selectedKeys).length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm font-medium text-muted">Selected:</p>
          <div className="flex flex-wrap gap-2">
            {Array.from(list.selectedKeys).map((key) => {
              const user = list.getItem(key);

              if (!user) return null;

              return (
                <div
                  key={`${user.id}-selected`}
                  className="flex items-center gap-2 rounded-lg bg-surface-tertiary px-2 py-1"
                >
                  <Avatar className="size-4" size="sm">
                    <Avatar.Image src={user.avatar} />
                    <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
