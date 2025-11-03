import {Alert, Button, CloseButton, Spinner} from "@heroui/react";
import React from "react";

export function Basic() {
  return (
    <div className="grid w-full max-w-xl gap-4">
      {/* Default - General information */}
      <Alert>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>New features available</Alert.Title>
          <Alert.Description>
            Check out our latest updates including dark mode support and improved accessibility
            features.
          </Alert.Description>
        </Alert.Content>
      </Alert>

      {/* Accent - Important information with action */}
      <Alert status="accent">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Update available</Alert.Title>
          <Alert.Description>
            A new version of the application is available. Please refresh to get the latest features
            and bug fixes.
          </Alert.Description>
        </Alert.Content>
        <Button size="sm" variant="primary">
          Refresh
        </Button>
      </Alert>

      {/* Success - Confirmation */}
      <Alert status="success">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Payment successful</Alert.Title>
          <Alert.Description>
            Your payment of $49.99 has been processed. A confirmation email has been sent to your
            inbox.
          </Alert.Description>
        </Alert.Content>
        <Button size="sm" variant="secondary">
          View Receipt
        </Button>
      </Alert>

      {/* Warning - Attention needed */}
      <Alert status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Storage almost full</Alert.Title>
          <Alert.Description>
            You're using 90% of your storage quota. Consider upgrading your plan or removing unused
            files to avoid service interruption.
          </Alert.Description>
        </Alert.Content>
        <Button size="sm" variant="secondary">
          Manage Storage
        </Button>
      </Alert>

      {/* Danger - Error with detailed steps */}
      <Alert status="danger">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Unable to connect to server</Alert.Title>
          <Alert.Description>
            We're experiencing connection issues. Please try the following:
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
            </ul>
          </Alert.Description>
        </Alert.Content>
        <Button size="sm" variant="danger">
          Retry
        </Button>
      </Alert>

      {/* Without description */}
      <Alert status="success">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Profile updated successfully</Alert.Title>
        </Alert.Content>
        <CloseButton />
      </Alert>

      {/* Custom indicator - Loading state */}
      <Alert status="accent">
        <Alert.Indicator>
          <Spinner size="sm" />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>Processing your request</Alert.Title>
          <Alert.Description>
            Please wait while we sync your data. This may take a few moments.
          </Alert.Description>
        </Alert.Content>
      </Alert>

      {/* Without close button */}
      <Alert status="warning">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Scheduled maintenance</Alert.Title>
          <Alert.Description>
            Our services will be unavailable on Sunday, March 15th from 2:00 AM to 6:00 AM UTC for
            scheduled maintenance.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}
