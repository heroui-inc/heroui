import type {ToastContentValue, ToastVariants} from "./index";
import type {HeroUIToastOptions} from "./toast-queue";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";

import {
  Toast,
  ToastContent,
  ToastDescription,
  ToastIndicator,
  ToastQueue,
  ToastTitle,
  toast,
} from "./index";

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
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          className="text-muted"
          size="sm"
          variant="tertiary"
          onPress={() => {
            toast("You have been invited to join a team", {
              actionProps: {
                children: "Dismiss",
                onPress: () => toast.clear(),
                variant: "tertiary",
              },
              description: "Bob sent you an invitation to join HeroUI team",
              indicator: <Icon icon="gravity-ui:persons" />,
              variant: "default",
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
              actionProps: {children: "Upgrade", onPress: noop},
              description: "Get a paid plan for more credits",
            })
          }
        >
          Accent toast
        </Button>
        <Button
          className="text-success"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.success("You have upgraded your plan", {
              actionProps: {
                children: "Billing",
                className: "bg-success text-success-foreground",
                onPress: noop,
              },
              description: "You can continue using HeroUI Chat",
            })
          }
        >
          Success toast
        </Button>
        <Button
          className="text-warning"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.warning("You have no credits left", {
              actionProps: {
                children: "Upgrade",
                className: "bg-warning text-warning-foreground",
                onPress: noop,
              },
              description: "Upgrade to a paid plan to continue",
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
              actionProps: {children: "Remove", onPress: noop, variant: "danger"},
              description:
                "Remove files to release space. I'm adding more text as usual but it's okay I guess I just want to see how it looks with a lot of information",
              indicator: <Icon icon="gravity-ui:hard-drive" />,
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
      description: "This toast demonstrates the placement option",
      title: `Toast at ${placement}`,
      variant: "default",
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      {/* Render a ToastProvider for each placement */}
      {placements.map((p) => (
        <Toast.Provider key={p} placement={p} queue={placementQueues[p]} />
      ))}
      <div className="flex max-w-xs flex-wrap justify-center gap-2">
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

// Simple Toast - Title only, minimal examples
const SimpleToastTemplate = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button size="sm" variant="secondary" onPress={() => toast("Simple message")}>
          Simple toast
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.success("Operation completed")}>
          Success (simple)
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.info("New update available")}>
          Info (simple)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => toast.warning("Please check your settings")}
        >
          Warning (simple)
        </Button>
        <Button size="sm" variant="secondary" onPress={() => toast.danger("Something went wrong")}>
          Danger (simple)
        </Button>
      </div>
    </div>
  );
};

export const SimpleToast = {
  render: SimpleToastTemplate,
};

// TODO: Handle promises
// Promise Toast - Async operations with loading/success/error states
const PromiseToastTemplate = () => {
  const simulateSuccess = (): Promise<{message: string}> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({message: "File uploaded successfully"}), 2000);
    });
  };

  const simulateError = (): Promise<never> => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Upload failed. Please try again.")), 2000);
    });
  };

  const simulateRandom = (): Promise<{count: number}> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({count: 42});
        } else {
          reject(new Error("Random error occurred"));
        }
      }, 2000);
    });
  };

  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(simulateSuccess(), {
              error: "Upload failed. Please try again.",
              loading: "Uploading file...",
              success: "File uploaded successfully",
            });
          }}
        >
          Promise (success)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(simulateError(), {
              error: (err) => err.message,
              loading: "Processing request...",
              success: "Request completed",
            });
          }}
        >
          Promise (error)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(simulateRandom(), {
              error: (err) => err.message,
              loading: "Loading data...",
              success: (data) => `Loaded ${data.count} items`,
            });
          }}
        >
          Promise (random)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            toast.promise(
              (): Promise<{user: string}> =>
                new Promise((resolve) => {
                  setTimeout(() => resolve({user: "John Doe"}), 2000);
                }),
              {
                error: "Failed to create account",
                loading: "Creating account...",
                success: (data: {user: string}) => `Welcome, ${data.user}!`,
              },
            );
          }}
        >
          Promise (function)
        </Button>
      </div>
    </div>
  );
};

export const PromiseToast = {
  render: PromiseToastTemplate,
};

// Custom Indicator - Custom or no indicators
const CustomIndicatorTemplate = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <Button
        size="sm"
        variant="secondary"
        onPress={() =>
          toast("Custom icon indicator", {
            indicator: <Icon icon="gravity-ui:star" />,
          })
        }
      >
        Custom indicator
      </Button>
    </div>
  );
};

export const CustomIndicator = {
  render: CustomIndicatorTemplate,
};

// TODO: Handle promises to support callbacks
// With Callbacks - Timeout and onClose
const WithCallbacksTemplate = () => {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("This toast closes in 3 seconds", {
              onClose: () => {
                toast.info("Toast was closed");
              },
              timeout: 3000,
            })
          }
        >
          Custom timeout (3s)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("This toast closes in 10 seconds", {
              onClose: () => {
                toast.info("Toast closed after 10 seconds");
              },
              timeout: 10000,
            })
          }
        >
          Custom timeout (10s)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.success("Operation completed", {
              onClose: () => {
                toast.info("Previous toast closed");
              },
            })
          }
        >
          With onClose callback
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast("Persistent toast (no timeout)", {
              onClose: () => {
                toast.info("Persistent toast was manually closed");
              },
              timeout: 0,
            })
          }
        >
          Persistent (no timeout)
        </Button>
      </div>
    </div>
  );
};

export const WithCallbacks = {
  render: WithCallbacksTemplate,
};

// Custom Toast - Custom rendering with children
const CustomToastTemplate = () => {
  const customQueue = new ToastQueue();

  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" queue={customQueue}>
        {({toast: toastItem}) => {
          const content = toastItem.content as ToastContentValue;

          return (
            <Toast
              className="rounded-xl border border-border"
              toast={toastItem}
              variant={content.variant}
            >
              <ToastContent>
                <div className="flex items-center gap-2">
                  <ToastIndicator className="text-accent" variant={content.variant} />
                  <div className="flex flex-col pr-6">
                    {content.title ? (
                      <ToastTitle className="text-accent">{content.title}</ToastTitle>
                    ) : null}
                    {content.description ? (
                      <ToastDescription>{content.description}</ToastDescription>
                    ) : null}
                  </div>
                </div>
              </ToastContent>
              <Toast.CloseButton className="absolute top-1/2 right-2 -translate-y-1/2 border-none bg-transparent opacity-100 [&>svg]:size-4" />
            </Toast>
          );
        }}
      </Toast.Provider>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          customQueue.add({
            description: "This uses a custom render function",
            title: "Custom layout toast",
            variant: "default",
          });
        }}
      >
        Custom toast
      </Button>
    </div>
  );
};

export const CustomToast = {
  render: CustomToastTemplate,
};

// Custom Queue - Multiple queue instances
const CustomQueueTemplate = () => {
  const notificationQueue = new ToastQueue({maxVisibleToasts: 2});
  const errorQueue = new ToastQueue({maxVisibleToasts: 3});
  const successQueue = new ToastQueue({maxVisibleToasts: 1});

  return (
    <div className="flex h-full max-w-4xl items-center justify-center gap-4">
      {/* Notification Queue */}
      <Toast.Provider placement="bottom" queue={notificationQueue} />
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            notificationQueue.add({
              description: `Notification ${Date.now()}`,
              title: "New notification",
              variant: "default",
            });
          }}
        >
          Add notification (max 2)
        </Button>
      </div>

      {/* Error Queue */}
      <Toast.Provider placement="top" queue={errorQueue} />
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() => {
            errorQueue.add({
              description: `Error ${Date.now()}`,
              title: "Error occurred",
              variant: "danger",
            });
          }}
        >
          Add error (max 3)
        </Button>
      </div>

      {/* Success Queue */}
      <Toast.Provider placement="bottom end" queue={successQueue} />
      <div className="flex justify-center gap-2">
        <Button
          className="text-success"
          size="sm"
          variant="secondary"
          onPress={() => {
            successQueue.add({
              description: `Operation ${Date.now()}`,
              title: "Success!",
              variant: "success",
            });
          }}
        >
          Add success (max 1)
        </Button>
      </div>
    </div>
  );
};

export const CustomQueue = {
  render: CustomQueueTemplate,
};
