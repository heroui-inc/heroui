import React from "react";

import {Alert} from "./index";

export default {
  argTypes: {},
  component: Alert,
  title: "📝 ToDo/Alert",
};

const defaultArgs = {};

const Template = () => (
  <div className="flex w-full max-w-[500px] flex-col gap-6">
    <Alert>
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>Label</Alert.Action>
      <Alert.Close />
    </Alert>

    <Alert variant="success">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>Label</Alert.Action>
      <Alert.Close />
    </Alert>

    <Alert variant="warning">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>Label</Alert.Action>
      <Alert.Close />
    </Alert>

    <Alert variant="danger">
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>This is an alert</Alert.Title>
        <Alert.Description>Add description in this place</Alert.Description>
      </Alert.Content>
      <Alert.Action>Label</Alert.Action>
      <Alert.Close />
    </Alert>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
