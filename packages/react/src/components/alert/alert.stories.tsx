import React from "react";

import {
  Alert,
  AlertAction,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "./index";

export default {
  argTypes: {},
  component: Alert,
  title: "📝 ToDo/Alert",
};

const defaultArgs = {};

const Template = () => (
  <div className="flex w-full max-w-[500px] flex-col gap-6">
    <Alert>
      <AlertIcon />
      <AlertContent>
        <AlertTitle>This is an alert</AlertTitle>
        <AlertDescription>Add description in this place</AlertDescription>
      </AlertContent>
      <AlertAction>Label</AlertAction>
      <AlertClose />
    </Alert>

    <Alert variant="success">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>This is an alert</AlertTitle>
        <AlertDescription>Add description in this place</AlertDescription>
      </AlertContent>
      <AlertAction>Label</AlertAction>
      <AlertClose />
    </Alert>

    <Alert variant="warning">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>This is an alert</AlertTitle>
        <AlertDescription>Add description in this place</AlertDescription>
      </AlertContent>
      <AlertAction>Label</AlertAction>
      <AlertClose />
    </Alert>

    <Alert variant="danger">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>This is an alert</AlertTitle>
        <AlertDescription>Add description in this place</AlertDescription>
      </AlertContent>
      <AlertAction>Label</AlertAction>
      <AlertClose />
    </Alert>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};
