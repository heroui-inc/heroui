"use client";

import {
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertRoot,
  AlertTitle,
} from "@heroui/react";

export function WithAction() {
  return (
    <AlertRoot className="max-w-lg">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          A new software update is available. Would you like to install it now?
        </AlertDescription>
      </AlertContent>
      <AlertAction onClick={() => console.log("Update clicked")}>Update</AlertAction>
    </AlertRoot>
  );
}
