import type {RootProps} from "./alert";
import type {Meta} from "@storybook/react";

import {Button} from "../button";

import {Alert} from ".";

export default {
  argTypes: {},
  component: Alert,
  title: "Components/Alert",
} as Meta<typeof Alert.Root>;

const defaultArgs: RootProps = {};

const Template = () => (
  <div className="flex w-full max-w-[500px] flex-col gap-6">
    <Alert.Root>
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>
        <Button variant="ghost" />
      </Alert.Action>
      <Alert.Close />
    </Alert.Root>

    <Alert.Root variant="success">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>
        <Button variant="ghost">Label</Button>
      </Alert.Action>
      <Alert.Close />
    </Alert.Root>

    <Alert.Root variant="warning">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>
        <Button variant="ghost">Label</Button>
      </Alert.Action>
      <Alert.Close />
    </Alert.Root>

    <Alert.Root variant="danger">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>
        <Button variant="ghost">Label</Button>
      </Alert.Action>
      <Alert.Close />
    </Alert.Root>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
