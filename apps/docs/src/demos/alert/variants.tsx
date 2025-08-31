"use client";

import {Alert} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <Alert className="max-w-lg">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Default Alert</Alert.Title>
          <Alert.Description>
            This is the default alert variant with neutral styling.
          </Alert.Description>
        </Alert.Content>
      </Alert>

      <Alert variant="success" className="max-w-lg">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Success!</Alert.Title>
          <Alert.Description>
            Your operation completed successfully.
          </Alert.Description>
        </Alert.Content>
      </Alert>

      <Alert variant="warning" className="max-w-lg">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>
            Please review the information before proceeding.
          </Alert.Description>
        </Alert.Content>
      </Alert>

      <Alert variant="danger" className="max-w-lg">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>
            An error occurred while processing your request.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}