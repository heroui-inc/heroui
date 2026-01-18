import type {ToastVariants} from "./index";
import type {HeroUIToastOptions} from "./toast-queue";
import type {Meta, StoryObj} from "@storybook/react";

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

type Story = StoryObj<ToastStoryProps>;

const noop = () => {};

export const Example: Story = {
  render: (args) => (
    <>
      <Toast.Container placement={args.placement} />
      <div className="flex max-w-2xl flex-wrap gap-2">
        <Button
          variant="secondary"
          onPress={() =>
            toast("Toast available", {
              ...args,
              action: {label: "Action!", onClick: noop},
              onClose: noop,
            })
          }
        >
          Show Default Toast
        </Button>
        <Button
          variant="primary"
          onPress={() =>
            toast.success("Toast is done!", {
              ...args,
              action: {label: "Action!", onClick: noop},
              onClose: noop,
            })
          }
        >
          Show Success Toast
        </Button>
        <Button
          variant="danger"
          onPress={() =>
            toast.danger("Toast is burned!", {
              ...args,
              action: {label: "Action!", onClick: noop},
              onClose: noop,
            })
          }
        >
          Show Danger Toast
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            toast.info("Toasting…", {
              ...args,
              action: {label: "Action!", onClick: noop},
              onClose: noop,
            })
          }
        >
          Show Info Toast
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            toast.warning("Toast is getting hot!", {
              ...args,
              action: {label: "Action!", onClick: noop},
              onClose: noop,
            })
          }
        >
          Show Warning Toast
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            toast.info(
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              {...args, onClose: noop},
            )
          }
        >
          Show Long Toast
        </Button>
        <Button
          variant="secondary"
          onPress={() =>
            toast.info(
              "LoremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquaUtenimaminimveniamquisnostrudexercitationullamcolaborisnisiutaliquipeacommodoconsequat.",
              {...args, onClose: noop},
            )
          }
        >
          Show Long Word Toast
        </Button>
      </div>
    </>
  ),
};
