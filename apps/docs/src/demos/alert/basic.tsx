"use client";

import {AlertContent, AlertDescription, AlertIcon, AlertRoot, AlertTitle} from "@heroui/react";

export function Basic() {
  return (
    <AlertRoot className="max-w-lg">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </AlertContent>
    </AlertRoot>
  );
}
