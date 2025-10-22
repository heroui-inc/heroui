"use client";

import {Card} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <Card.Root className="w-[320px]" variant="flat">
        <Card.Header>
          <Card.Title>Variant Flat</Card.Title>
          <Card.Description>Transparent background with no border</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with no variant styling</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="outlined">
        <Card.Header>
          <Card.Title>Variant Outlined</Card.Title>
          <Card.Description>This card uses outlined variant (default)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with subtle elevation</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="elevated">
        <Card.Header>
          <Card.Title>Variant Elevated</Card.Title>
          <Card.Description>This card uses elevated variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with medium elevation</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="filled">
        <Card.Header>
          <Card.Title>Variant Filled</Card.Title>
          <Card.Description>This card uses filled variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with higher elevation</p>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
