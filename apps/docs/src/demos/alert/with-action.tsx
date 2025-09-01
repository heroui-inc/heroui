"use client";

import {Alert} from "@heroui/react";

export function WithAction() {
  return (
    <Alert className="max-w-lg">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>Update available</Alert.Title>
        <Alert.Description>
          A new software update is available. Would you like to install it now?
        </Alert.Description>
      </Alert.Content>
      <Alert.Action onClick={() => console.log("Update clicked")}>Update</Alert.Action>
    </Alert>
  );
}
