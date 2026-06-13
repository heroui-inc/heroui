"use client";

import type {Key} from "@heroui/react";

import {
  Autocomplete,
  Description,
  EmptyState,
  Label,
  ListBox,
  ListLayout,
  SearchField,
  Virtualizer,
  useFilter,
} from "@heroui/react";
import {useMemo, useState} from "react";

interface User {
  email: string;
  id: number;
  name: string;
}

function generateUsers(n: number): User[] {
  const firstNames = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "James",
    "Sophia",
    "Oliver",
    "Isabella",
    "Lucas",
    "Mia",
    "Ethan",
    "Charlotte",
    "Mason",
    "Amelia",
    "Logan",
    "Harper",
    "Alexander",
    "Ella",
    "Benjamin",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Anderson",
    "Taylor",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Clark",
    "Lewis",
    "Robinson",
    "Walker",
  ];
  const users: User[] = [];

  for (let i = 0; i < n; i++) {
    const firstName = firstNames[i % firstNames.length]!;
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length]!;
    const name = `${firstName} ${lastName}`;

    users.push({
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@acme.com`,
      id: i + 1,
      name,
    });
  }

  return users;
}

export function Virtualization() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {contains} = useFilter({sensitivity: "base"});

  const allUsers = useMemo(() => generateUsers(1000), []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return allUsers;

    return allUsers.filter(
      (user) => contains(user.name, searchQuery) || contains(user.email, searchQuery),
    );
  }, [allUsers, contains, searchQuery]);

  return (
    <Autocomplete
      allowsEmptyCollection
      className="w-[300px]"
      placeholder="选择用户"
      selectionMode="single"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>用户</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter inputValue={searchQuery} onInputChange={setSearchQuery}>
          <SearchField autoFocus className="sticky top-0 z-10" name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="搜索用户…" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <Virtualizer layout={ListLayout} layoutOptions={{rowHeight: 50}}>
            <ListBox
              items={filteredUsers}
              renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}
            >
              {(user) => (
                <ListBox.Item id={user.id} textValue={user.name}>
                  <div className="flex flex-col">
                    <Label>{user.name}</Label>
                    <Description>{user.email}</Description>
                  </div>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              )}
            </ListBox>
          </Virtualizer>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
