import {Alert, Button} from "@heroui/react";

export function AlertDemo() {
  return (
    <Alert className="w-full items-center xl:w-[400px]">
      <Alert.Indicator />
      <Alert.Content className="text-left">
        <Alert.Title className="leading-4">You have 2 credits left</Alert.Title>
        <Alert.Description className="text-xs">Get a paid plan for more credits</Alert.Description>
      </Alert.Content>
      <Button variant="tertiary">Upgrade</Button>
    </Alert>
  );
}
