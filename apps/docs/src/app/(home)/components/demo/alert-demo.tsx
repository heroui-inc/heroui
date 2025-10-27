import {Alert, Button} from "@heroui/react";

export function AlertDemo() {
  return (
    <Alert.Root className="bg-surface shadow-surface w-[400px] items-center">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>You have 2 credtis left</Alert.Title>
        <Alert.Description>Get a paid plan for more credits</Alert.Description>
      </Alert.Content>
      <Button variant="tertiary">Upgrade</Button>
    </Alert.Root>
  );
}
