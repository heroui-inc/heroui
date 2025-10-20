"use client";

import {Alert} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomIcon() {
  return (
    <div className="flex flex-col gap-4">
      <Alert.Root className="max-w-lg" variant="success">
        <Alert.Icon>
          <Icon className="size-5" icon="gravity-ui:circle-check-fill" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Payment received</Alert.Title>
          <Alert.Description>Your payment has been successfully processed.</Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Alert.Root className="max-w-lg" variant="danger">
        <Alert.Icon>
          <Icon className="size-5" icon="gravity-ui:triangle-exclamation-fill" />
        </Alert.Icon>
        <Alert.Content>
          <Alert.Title>Security alert</Alert.Title>
          <Alert.Description>Unusual activity detected in your account.</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </div>
  );
}
