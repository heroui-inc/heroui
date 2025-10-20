"use client";

import {Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle} from "@heroui/react";

export function Basic() {
  return (
    <Alert className="max-w-lg">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </AlertContent>
    </Alert>
  );
}
