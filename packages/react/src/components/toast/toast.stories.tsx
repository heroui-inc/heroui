import type {ToastVariants} from "./index";
import type {HeroUIToastOptions} from "./toast-queue";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";

import {Toast, toast} from "./index";

type Placement = NonNullable<ToastVariants["placement"]>;

interface ToastStoryProps extends Omit<HeroUIToastOptions, "variant"> {
  placement?: Placement;
}

const meta: Meta<ToastStoryProps> = {
  argTypes: {
    placement: {
      control: "radio",
      options: ["top start", "top", "top end", "bottom start", "bottom", "bottom end"],
    },
    timeout: {
      control: "number",
    },
  },
  args: {
    placement: "bottom",
    timeout: undefined,
  },
  parameters: {
    layout: "centered",
  },
  title: "Components/Feedback/Toast",
};

export default meta;

const noop = () => {};

const Template = () => {
  return (
    <div className="max-w-xl">
      <Toast.Container placement="bottom" />
      <div className="flex w-full flex-wrap gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast("You have been invited to join a team", {
              description: "Bob sent you an invitation to join HeroUI team",
              variant: "default",
              indicator: <Icon icon="gravity-ui:persons" />,
              actionProps: {
                children: "Dismiss",
                onPress: () => toast.clear(),
                variant: "tertiary",
              },
            });
          }}
        >
          Default toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.info("You have 2 credits left", {
              description: "Get a paid plan for more credits",
              actionProps: {children: "Upgrade", onPress: noop},
            })
          }
        >
          Accent toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.success("You have upgraded your plan", {
              description: "You can continue using HeroUI Chat",
              actionProps: {
                children: "Billing",
                onPress: noop,
                className: "bg-success text-success-foreground",
              },
            })
          }
        >
          Success toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.warning("You have no credits left", {
              description: "Upgrade to a paid plan to continue",
              actionProps: {
                children: "Upgrade",
                onPress: noop,
                className: "bg-warning text-warning-foreground",
              },
            })
          }
        >
          Warning toast
        </Button>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() =>
            toast.danger("Storage is full", {
              description:
                "Remove files to release space. I'm adding more text as usual but it's okay I guess I just want to see how it looks with a lot of information",
              indicator: <Icon icon="gravity-ui:hard-drive" />,
              actionProps: {children: "Remove", onPress: noop, variant: "danger"},
            })
          }
        >
          Danger toast
        </Button>
      </div>
    </div>
  );
};

export const Default = {
  args: {},
  render: Template,
};
