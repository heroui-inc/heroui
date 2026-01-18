import type {ToastVariants} from "./index";
import type {HeroUIToastOptions} from "./toast-queue";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";

import {Toast, ToastQueue, toast} from "./index";

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

const placements = ["top start", "top", "top end", "bottom start", "bottom", "bottom end"] as const;

// Create a separate queue for each placement
const placementQueues = Object.fromEntries(
  placements.map((p) => [p, new ToastQueue({maxVisibleToasts: 3})]),
) as Record<Placement, ToastQueue>;

const PlacementsTemplate = () => {
  const showToast = (placement: Placement) => {
    placementQueues[placement].add({
      title: `Toast at ${placement}`,
      description: "This toast demonstrates the placement option",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Render a ToastContainer for each placement */}
      {placements.map((p) => (
        <Toast.Container key={p} placement={p} toast={placementQueues[p]} />
      ))}
      <div className="grid grid-cols-3 gap-2">
        {placements.map((p) => (
          <Button key={p} size="sm" variant="secondary" onPress={() => showToast(p)}>
            {p}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Placements = {
  render: PlacementsTemplate,
};
