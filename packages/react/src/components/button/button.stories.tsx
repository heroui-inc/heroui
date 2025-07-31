import type {ButtonProps} from "./button";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {Spinner} from "../spinner";

import {Button} from "./index";

export default {
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost", "danger"],
    },
  },
  component: Button,
  title: "✅ Ready/Button",
} as Meta<typeof Button>;

const defaultArgs: ButtonProps = {
  size: "md",
};

const Template = ({isDisabled, size}: ButtonProps) => (
  <div className="flex gap-3">
    <Button isDisabled={isDisabled} size={size}>
      Primary
    </Button>
    <Button isDisabled={isDisabled} size={size} variant="secondary">
      Secondary
    </Button>
    <Button isDisabled={isDisabled} size={size} variant="tertiary">
      Tertiary
    </Button>
    <Button isDisabled={isDisabled} size={size} variant="ghost">
      Ghost
    </Button>
    <Button isDisabled={isDisabled} size={size} variant="danger">
      Danger
    </Button>
  </div>
);

const TemplateWithIcon = ({isDisabled, size}: ButtonProps) => (
  <div className="flex gap-3">
    <Button isDisabled={isDisabled} size={size}>
      <Icon icon="gravity-ui:globe" />
      Search
    </Button>
    <Button isDisabled={isDisabled} size={size} variant="secondary">
      <Icon icon="gravity-ui:plus" />
      Add Member
    </Button>
    <Button isDisabled={isDisabled} size={size} variant="tertiary">
      <Icon icon="gravity-ui:envelope" />
      Email
    </Button>
    <Button isDisabled={isDisabled} size={size} variant="danger">
      <Icon icon="gravity-ui:trash-bin" />
      Delete
    </Button>
  </div>
);

const TemplateWithIconOnly = ({isDisabled, size, variant}: ButtonProps) => (
  <div className="flex gap-3">
    <Button isIconOnly isDisabled={isDisabled} size={size} variant={variant ?? "tertiary"}>
      <Icon icon="gravity-ui:ellipsis" />
    </Button>
  </div>
);

const TemplateWithSpinner = ({size, variant}: ButtonProps) => (
  <div className="flex gap-3">
    <Button isPending size={size} variant={variant}>
      <Spinner />
      Loading
    </Button>
  </div>
);

const TemplateWithLoadingState = ({size, variant}: ButtonProps) => {
  const [isLoading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4500);
  };

  return (
    <Button isPending={isLoading} size={size} variant={variant ?? "tertiary"} onPress={handlePress}>
      {({isPending}) => (
        <>
          {isPending ? <Spinner /> : <Icon icon="gravity-ui:paperclip" />}
          {isLoading ? "Uploading..." : "Upload File"}
        </>
      )}
    </Button>
  );
};

const TemplateWithSocialButton = ({size, variant}: ButtonProps) => (
  <div className="flex w-full max-w-xs flex-col gap-3">
    <Button size={size} variant={variant ?? "tertiary"}>
      <Icon icon="devicon:google" />
      Sign in with Google
    </Button>
    <Button size={size} variant={variant ?? "tertiary"}>
      <Icon icon="mdi:github" />
      Sign in with GitHub
    </Button>
    <Button size={size} variant={variant ?? "tertiary"}>
      <Icon icon="ion:logo-apple" />
      Sign in with Apple
    </Button>
    <Button size={size} variant={variant ?? "tertiary"}>
      <Icon icon="typcn:social-linkedin" />
      Sign in with LinkedIn
    </Button>
  </div>
);

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithIcon = {
  args: defaultArgs,
  render: TemplateWithIcon,
};

export const WithIconOnly = {
  args: defaultArgs,
  render: TemplateWithIconOnly,
};

export const WithSpinner = {
  args: defaultArgs,
  render: TemplateWithSpinner,
};

export const WithLoadingState = {
  args: defaultArgs,
  render: TemplateWithLoadingState,
};

export const WithSocialButton = {
  args: defaultArgs,
  render: TemplateWithSocialButton,
};
