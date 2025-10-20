"use client";

import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@heroui/react";

export function WithAction() {
  return (
    <Alert className="max-w-lg">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          A new software update is available. Would you like to install it now?
        </AlertDescription>
      </AlertContent>
      <AlertAction onClick={() => console.log("Update clicked")}>Update</AlertAction>
    </Alert>
  );
}
