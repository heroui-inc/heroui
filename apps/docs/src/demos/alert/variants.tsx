"use client";

import {AlertContent, AlertDescription, AlertIcon, AlertRoot, AlertTitle} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <AlertRoot className="max-w-lg">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Default Alert</AlertTitle>
          <AlertDescription>
            This is the default alert variant with neutral styling.
          </AlertDescription>
        </AlertContent>
      </AlertRoot>

      <AlertRoot className="max-w-lg" variant="success">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your operation completed successfully.</AlertDescription>
        </AlertContent>
      </AlertRoot>

      <AlertRoot className="max-w-lg" variant="warning">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Please review the information before proceeding.</AlertDescription>
        </AlertContent>
      </AlertRoot>

      <AlertRoot className="max-w-lg" variant="danger">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>An error occurred while processing your request.</AlertDescription>
        </AlertContent>
      </AlertRoot>
    </div>
  );
}
