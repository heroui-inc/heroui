import React, {useState} from "react";

import {Button} from "../button";

import {Toast, ToastQueue} from "./index";

// Define toast content type
type ToastContent = {
  title: string;
  description?: string;
};

// Create a global toast queue
const toastQueue = new ToastQueue<ToastContent>();

export default {
  argTypes: {},
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Feedback/Toast",
};

const Template = () => {
  return (
    <div className="min-h-screen p-8">
      <Toast.Region placement="bottom-right" queue={toastQueue}>
        {({toast}) => {
          const content = toast.content as ToastContent;

          return (
            <Toast toast={toast} variant="default">
              <Toast.Content>
                <Toast.Title>{content.title}</Toast.Title>
                {!!content.description && (
                  <Toast.Description>{content.description}</Toast.Description>
                )}
              </Toast.Content>
              <Toast.Close />
            </Toast>
          );
        }}
      </Toast.Region>

      <div className="flex max-w-md flex-col gap-4">
        <h2 className="text-2xl font-bold">Toast Examples</h2>

        <div className="flex flex-col gap-2">
          <Button
            onPress={() =>
              toastQueue.add({
                title: "Files uploaded",
                description: "3 files uploaded successfully.",
              })
            }
          >
            Show Default Toast
          </Button>

          <Button
            variant="primary"
            onPress={() =>
              toastQueue.add(
                {
                  title: "Update available",
                  description: "A new version is ready to install.",
                },
                {timeout: 5000},
              )
            }
          >
            Show Accent Toast (5s timeout)
          </Button>

          <Button
            variant="primary"
            onPress={() =>
              toastQueue.add({
                title: "Payment successful",
                description: "Your payment has been processed.",
              })
            }
          >
            Show Success Toast
          </Button>

          <Button
            variant="secondary"
            onPress={() =>
              toastQueue.add({
                title: "Storage almost full",
                description: "You're using 90% of your storage quota.",
              })
            }
          >
            Show Warning Toast
          </Button>

          <Button
            variant="danger"
            onPress={() =>
              toastQueue.add({
                title: "Unable to connect",
                description: "We're experiencing connection issues.",
              })
            }
          >
            Show Danger Toast
          </Button>

          <Button
            variant="secondary"
            onPress={() =>
              toastQueue.add({
                title: "File saved",
              })
            }
          >
            Show Toast Without Description
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Default = {
  args: {},
  render: Template,
};

const ProgrammaticDismissTemplate = () => {
  const [toastKey, setToastKey] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-8">
      <Toast.Region placement="bottom-right" queue={toastQueue}>
        {({toast}) => {
          const content = toast.content as ToastContent;

          return (
            <Toast toast={toast} variant="default">
              <Toast.Content>
                <Toast.Title>{content.title}</Toast.Title>
                {!!content.description && (
                  <Toast.Description>{content.description}</Toast.Description>
                )}
              </Toast.Content>
              <Toast.Close />
            </Toast>
          );
        }}
      </Toast.Region>

      <div className="flex max-w-md flex-col gap-4">
        <h2 className="text-2xl font-bold">Programmatic Dismiss</h2>

        <Button
          onPress={() => {
            if (!toastKey) {
              setToastKey(
                toastQueue.add(
                  {
                    title: "Processing...",
                    description: "This toast can be dismissed programmatically.",
                  },
                  {onClose: () => setToastKey(null)},
                ),
              );
            } else {
              toastQueue.close(toastKey);
              setToastKey(null);
            }
          }}
        >
          {toastKey ? "Cancel Processing" : "Start Processing"}
        </Button>
      </div>
    </div>
  );
};

export const ProgrammaticDismiss = {
  args: {},
  render: ProgrammaticDismissTemplate,
};

const PlacementTemplate = () => {
  const [placement, setPlacement] = useState<
    "top-left" | "top-right" | "bottom-left" | "bottom-right"
  >("bottom-right");

  return (
    <div className="min-h-screen p-8">
      <Toast.Region placement={placement} queue={toastQueue}>
        {({toast}) => {
          const content = toast.content as ToastContent;

          return (
            <Toast toast={toast} variant="default">
              <Toast.Content>
                <Toast.Title>{content.title}</Toast.Title>
                {!!content.description && (
                  <Toast.Description>{content.description}</Toast.Description>
                )}
              </Toast.Content>
              <Toast.Close />
            </Toast>
          );
        }}
      </Toast.Region>

      <div className="flex max-w-md flex-col gap-4">
        <h2 className="text-2xl font-bold">Placement Options</h2>

        <div className="flex flex-col gap-2">
          <Button
            onPress={() => {
              setPlacement("top-left");
              toastQueue.add({
                title: "Top Left",
                description: "Toast appears in the top-left corner.",
              });
            }}
          >
            Top Left
          </Button>

          <Button
            onPress={() => {
              setPlacement("top-right");
              toastQueue.add({
                title: "Top Right",
                description: "Toast appears in the top-right corner.",
              });
            }}
          >
            Top Right
          </Button>

          <Button
            onPress={() => {
              setPlacement("bottom-left");
              toastQueue.add({
                title: "Bottom Left",
                description: "Toast appears in the bottom-left corner.",
              });
            }}
          >
            Bottom Left
          </Button>

          <Button
            onPress={() => {
              setPlacement("bottom-right");
              toastQueue.add({
                title: "Bottom Right",
                description: "Toast appears in the bottom-right corner.",
              });
            }}
          >
            Bottom Right
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Placement = {
  args: {},
  render: PlacementTemplate,
};
