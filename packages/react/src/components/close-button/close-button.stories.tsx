import type {Meta} from "@storybook/react";

import {CloseButton} from "./close-button";

export default {
  argTypes: {},
  component: CloseButton,
  title: "Components/CloseButton",
} as Meta<typeof CloseButton>;

export const Default = () => <CloseButton />;

export const Sizes = () => (
  <div className="flex items-center gap-4">
    <CloseButton size="sm" />
    <CloseButton size="md" />
    <CloseButton size="lg" />
  </div>
);

export const WithOnPress = () => <CloseButton onPress={() => alert("Close button pressed!")} />;

export const Disabled = () => <CloseButton isDisabled />;
