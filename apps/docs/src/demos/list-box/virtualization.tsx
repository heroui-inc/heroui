"use client";

import {Description, Label, ListBox, ListLayout, Virtualizer} from "@heroui/react";

interface User {
  id: number;
  name: string;
  email: string;
}

export function Virtualization() {
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

  function generateUsers(n: number): User[] {
    const users: User[] = [];

    for (let i = 0; i < n; i++) {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
      const name = `${firstName} ${lastName}`;

      users.push({
        email: `${firstName?.toLowerCase()}.${lastName?.toLowerCase()}@acme.com`,
        id: i + 1,
        name,
      });
    }

    return users;
  }

  const users = generateUsers(1000);

  return (
    <Virtualizer layout={ListLayout} layoutOptions={{rowHeight: 50}}>
      <ListBox
        aria-label="Virtualized list with 1000 items"
        className="h-[400px] w-[300px] overflow-y-auto"
        items={users}
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
  );
}
