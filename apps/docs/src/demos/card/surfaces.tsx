"use client";

import {Card} from "@heroui/react";

export function Surfaces() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Card className="w-full" surface="none">
        <Card.Header>
          <Card.Title>Surface None</Card.Title>
          <Card.Description>Transparent background with no border or shadow</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Use this for cards that should blend seamlessly with the background.
          </p>
        </Card.Content>
      </Card>

      <Card className="w-full" surface="1">
        <Card.Header>
          <Card.Title>Surface Level 1</Card.Title>
          <Card.Description>Default surface with subtle elevation (default)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            The default surface level provides subtle contrast from the background.
          </p>
        </Card.Content>
      </Card>

      <Card className="w-full" surface="2">
        <Card.Header>
          <Card.Title>Surface Level 2</Card.Title>
          <Card.Description>Medium elevation for secondary content</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Use for cards that need more visual prominence than level 1.</p>
        </Card.Content>
      </Card>

      <Card className="w-full" surface="3">
        <Card.Header>
          <Card.Title>Surface Level 3</Card.Title>
          <Card.Description>Highest elevation for emphasized content</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">
            Reserved for the most important cards that need maximum visual weight.
          </p>
        </Card.Content>
      </Card>
    </div>
  );
}
