"use client";

import {Alert} from "@heroui/react";

export function Basic() {
  return (
    <Alert className="max-w-lg">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>Heads up!</Alert.Title>
        <Alert.Description>
          You can add components to your app using the cli.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}