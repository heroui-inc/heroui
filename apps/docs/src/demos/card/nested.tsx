"use client";

import {Card} from "@heroui/react";

export function Nested() {
  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Parent Card</Card.Title>
        <Card.Description>This card contains nested cards</Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <Card surface="2">
          <Card.Header>
            <Card.Title>Nested Card 1</Card.Title>
            <Card.Description>This is a nested card with surface level 2</Card.Description>
          </Card.Header>
        </Card>
        <Card surface="3">
          <Card.Header>
            <Card.Title>Nested Card 2</Card.Title>
            <Card.Description>This is another nested card with surface level 3</Card.Description>
          </Card.Header>
        </Card>
      </Card.Content>
    </Card>
  );
}
