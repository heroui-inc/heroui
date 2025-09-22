"use client";

import {Card, Link} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Default() {
  return (
    <Card className="w-full max-w-md">
      <Icon className="size-6" icon="gravity-ui:circle-dollar" />
      <Card.CloseButton />
      <Card.Details>
        <Card.Header>
          <Card.Title>PAYMENT</Card.Title>
          <Card.Description>You can now withdraw on crypto.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Add your wallet in settings to withdraw</p>
        </Card.Content>
      </Card.Details>
      <Card.Footer>
        <Link href="https://heroui.com" target="_blank">
          Go to settings
          <Link.Icon />
        </Link>
      </Card.Footer>
    </Card>
  );
}
