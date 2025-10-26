"use client";

import {Card} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <Card.Root className="w-[320px]" variant="default">
        <Card.Header>
          <Card.Title>Default</Card.Title>
          <Card.Description>Standard card appearance (surface-1)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>The default card variant for most use cases</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="subtle">
        <Card.Header>
          <Card.Title>Subtle</Card.Title>
          <Card.Description>Minimal prominence with transparent background</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use for less important content or nested cards</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="emphasis">
        <Card.Header>
          <Card.Title>Emphasis</Card.Title>
          <Card.Description>Medium prominence (surface-2)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use to draw moderate attention</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="strong">
        <Card.Header>
          <Card.Title>Strong</Card.Title>
          <Card.Description>Highest prominence (surface-3)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use for primary or featured content</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="panel">
        <Card.Header>
          <Card.Title>Panel</Card.Title>
          <Card.Description>Special panel background</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use for cards that need to stand out with panel styling</p>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
