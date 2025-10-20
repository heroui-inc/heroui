"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Link,
  LinkIcon,
} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Default() {
  return (
    <Card className="w-[400px]">
      <Icon
        aria-label="Dollar sign icon"
        className="text-primary size-6"
        icon="gravity-ui:circle-dollar"
        role="img"
      />
      <CardHeader>
        <CardTitle>PAYMENT</CardTitle>
        <CardDescription>You can now withdraw on crypto.</CardDescription>
      </CardHeader>
      <CardContent id="payment-content">
        <p>Add your wallet in settings to withdraw</p>
      </CardContent>
      <CardFooter>
        <Link
          aria-label="Go to settings (opens in new tab)"
          href="https://heroui.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to settings
          <LinkIcon aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
