"use client";

import {Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomIcon() {
  return (
    <div className="flex flex-col gap-4">
      <Alert className="max-w-lg" variant="success">
        <AlertIcon>
          <Icon className="size-5" icon="gravity-ui:circle-check-fill" />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Payment received</AlertTitle>
          <AlertDescription>Your payment has been successfully processed.</AlertDescription>
        </AlertContent>
      </Alert>

      <Alert className="max-w-lg" variant="danger">
        <AlertIcon>
          <Icon className="size-5" icon="gravity-ui:triangle-exclamation-fill" />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Security alert</AlertTitle>
          <AlertDescription>Unusual activity detected in your account.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  );
}
