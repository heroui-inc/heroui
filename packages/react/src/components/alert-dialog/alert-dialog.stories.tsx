import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {useOverlayState} from "../../hooks/use-overlay-state";
import {Button} from "../button";
import {Kbd} from "../kbd";

import {AlertDialog} from "./index";

export default {
  argTypes: {},
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Overlays/AlertDialog",
} as Meta<typeof AlertDialog>;

export const Default = () => {
  return (
    <AlertDialog>
      <Button variant="danger">Delete Project</Button>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          {({close}) => (
            <>
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete <strong>My Awesome Project</strong> and all of its
                  data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button variant="tertiary" onPress={close}>
                  Cancel
                </Button>
                <Button variant="danger" onPress={close}>
                  Delete Project
                </Button>
              </AlertDialog.Footer>
            </>
          )}
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog>
  );
};

export const Statuses = () => {
  const examples = [
    {
      actions: {
        cancel: "Stay Signed In",
        confirm: "Sign Out",
      },
      body: "You'll need to sign in again to access your account. Any unsaved changes will be lost.",
      classNames: "bg-accent-soft text-accent-soft-foreground",
      header: "Sign out of your account?",
      status: "accent",
      trigger: "Sign Out",
    },
    {
      actions: {
        cancel: "Not Yet",
        confirm: "Mark Complete",
      },
      body: "This will mark the task as complete and notify all team members. The task will be moved to your completed list.",
      classNames: "bg-success-soft text-success-soft-foreground",
      header: "Complete this task?",
      status: "success",
      trigger: "Complete Task",
    },
    {
      actions: {
        cancel: "Keep Editing",
        confirm: "Discard",
      },
      body: "You have unsaved changes that will be permanently lost. Are you sure you want to discard them?",
      classNames: "bg-warning-soft text-warning-soft-foreground",
      header: "Discard unsaved changes?",
      status: "warning",
      trigger: "Discard Changes",
    },
    {
      actions: {
        cancel: "Cancel",
        confirm: "Delete Account",
      },
      body: "This will permanently delete your account and remove all your data from our servers. This action is irreversible.",
      classNames: "bg-danger-soft text-danger-soft-foreground",
      header: "Delete your account?",
      status: "danger",
      trigger: "Delete Account",
    },
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {examples.map(({actions, body, classNames, header, status, trigger}) => (
        <AlertDialog key={status}>
          <Button className={classNames}>{trigger}</Button>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status={status} />
                    <AlertDialog.Heading>{header}</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>{body}</p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      {actions.cancel}
                    </Button>
                    <Button variant={status === "danger" ? "danger" : "primary"} onPress={close}>
                      {actions.confirm}
                    </Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      ))}
    </div>
  );
};

export const Placements = () => {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <AlertDialog key={placement}>
          <Button variant="secondary">
            {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Button>
          <AlertDialog.Container placement={placement}>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent" />
                    <AlertDialog.Heading>
                      {placement === "auto"
                        ? "Auto Placement"
                        : `${placement.charAt(0).toUpperCase() + placement.slice(1)} Position`}
                    </AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      {placement === "auto"
                        ? "Automatically positions at the bottom on mobile and center on desktop for optimal user experience."
                        : `This dialog is positioned at the ${placement} of the viewport. Critical confirmations are typically centered for maximum attention.`}
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      Cancel
                    </Button>
                    <Button onPress={close}>Confirm</Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      ))}
    </div>
  );
};

export const BackdropVariants = () => {
  const variants = [
    {name: "solid", value: "solid"},
    {name: "blur", value: "blur"},
    {name: "transparent", value: "transparent"},
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map(({name, value}) => (
        <AlertDialog key={value}>
          <Button variant="secondary">{name.charAt(0).toUpperCase() + name.slice(1)}</Button>
          <AlertDialog.Container backdropVariant={value}>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent" />
                    <AlertDialog.Heading>
                      {name === "solid"
                        ? "Solid Backdrop"
                        : name === "blur"
                          ? "Blur Backdrop"
                          : "Transparent Backdrop"}
                    </AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      {name === "solid"
                        ? "A solid dark backdrop that completely obscures the background, providing maximum focus on the dialog."
                        : name === "blur"
                          ? "A blurred backdrop that softly obscures the background while maintaining visual context."
                          : "A transparent backdrop that keeps the background fully visible, useful for less critical confirmations."}
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      Cancel
                    </Button>
                    <Button onPress={close}>Confirm</Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      ))}
    </div>
  );
};

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const state = useOverlayState();

  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-lg font-semibold">With React.useState()</h3>
        <p className="text-muted text-pretty text-sm leading-relaxed">
          Control the dialog using React's <code className="text-foreground">useState</code> hook
          for simple state management. Perfect for basic use cases.
        </p>
        <div className="border-border bg-surface flex flex-col items-start gap-3 rounded-2xl border p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-muted text-xs">
              Status:{" "}
              <span className="text-foreground font-mono font-medium">
                {isOpen ? "open" : "closed"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
              Open Dialog
            </Button>
            <Button size="sm" variant="tertiary" onPress={() => setIsOpen(!isOpen)}>
              Toggle
            </Button>
          </div>
        </div>

        <AlertDialog.Container isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
              <AlertDialog.Heading>Controlled with useState()</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This dialog is controlled by React's <code>useState</code> hook. Pass{" "}
                <code>isOpen</code> and <code>onOpenChange</code> props to manage the dialog state
                externally.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onPress={() => setIsOpen(false)}>Confirm</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-lg font-semibold">With useOverlayState()</h3>
        <p className="text-muted text-pretty text-sm leading-relaxed">
          Use the <code className="text-foreground">useOverlayState</code> hook for a cleaner API
          with convenient methods like <code>open()</code>, <code>close()</code>, and{" "}
          <code>toggle()</code>.
        </p>
        <div className="border-border bg-surface flex flex-col items-start gap-3 rounded-2xl border p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-muted text-xs">
              Status:{" "}
              <span className="text-foreground font-mono font-medium">
                {state.isOpen ? "open" : "closed"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={state.open}>
              Open Dialog
            </Button>
            <Button size="sm" variant="tertiary" onPress={state.toggle}>
              Toggle
            </Button>
          </div>
        </div>

        <AlertDialog.Container isOpen={state.isOpen} onOpenChange={state.setOpen}>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.Header>
              <AlertDialog.Icon status="success" />
              <AlertDialog.Heading>Controlled with useOverlayState()</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                The <code>useOverlayState</code> hook provides dedicated methods for common
                operations. No need to manually create callbacks—just use <code>state.open()</code>,{" "}
                <code>state.close()</code>, or <code>state.toggle()</code>.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={state.close}>
                Cancel
              </Button>
              <Button onPress={state.close}>Confirm</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </div>
    </div>
  );
};

export const DismissBehavior = () => (
  <div className="flex max-w-md flex-col gap-8">
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-lg font-semibold">Dismiss Behavior</h3>
      <p className="text-muted text-pretty text-sm leading-relaxed">
        Alert dialogs require explicit user action by design—users must click an action button to
        close the dialog. By default, backdrop clicks and ESC key are both disabled to prevent
        accidental dismissal of critical confirmations.
      </p>
    </div>

    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-lg font-semibold">Default (Requires Action)</h3>
      <p className="text-muted text-pretty text-sm leading-relaxed">
        With default settings, users cannot close the dialog by clicking outside or pressing ESC.
        They must choose an action button.
      </p>
      <AlertDialog>
        <Button variant="danger">Delete Project</Button>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            {({close}) => (
              <>
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger">
                    <Icon className="size-5" icon="gravity-ui:triangle-exclamation" />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>Delete this project?</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    This will permanently delete <strong>Marketing Campaign 2024</strong> and all
                    its files. This action cannot be undone.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button variant="tertiary" onPress={close}>
                    Cancel
                  </Button>
                  <Button variant="danger" onPress={close}>
                    Delete Project
                  </Button>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog>
    </div>

    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-lg font-semibold">Allow Backdrop Clicks</h3>
      <p className="text-muted text-pretty text-sm leading-relaxed">
        Set <code className="text-foreground">isDismissable=true</code> to let users click outside
        the dialog to close it. Useful for less critical confirmations.
      </p>
      <AlertDialog>
        <Button variant="secondary">Update Available</Button>
        <AlertDialog.Container isDismissable>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            {({close}) => (
              <>
                <AlertDialog.Header>
                  <AlertDialog.Icon status="success">
                    <Icon className="size-5" icon="gravity-ui:arrow-up-from-line" />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>Update available</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    Version 2.4.0 is now available. This update includes performance improvements
                    and bug fixes.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button variant="tertiary" onPress={close}>
                    Later
                  </Button>
                  <Button onPress={close}>Update Now</Button>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog>
    </div>

    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-lg font-semibold">Full Flexibility</h3>
      <p className="text-muted text-pretty text-sm leading-relaxed">
        Enable both <code className="text-foreground">isDismissable=true</code> and{" "}
        <code className="text-foreground">isKeyboardDismissDisabled=false</code> for maximum
        flexibility. Users can close via backdrop,{" "}
        <Kbd>
          <Kbd.Content>Esc</Kbd.Content>
        </Kbd>
        , or button.
      </p>
      <AlertDialog>
        <Button variant="secondary">Show Tips</Button>
        <AlertDialog.Container isDismissable isKeyboardDismissDisabled={false}>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            {({close}) => (
              <>
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent">
                    <Icon className="size-5" icon="gravity-ui:circle-info" />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>Pro tip</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    Use keyboard shortcuts to work faster. Press{" "}
                    <Kbd>
                      <Kbd.Content>Esc</Kbd.Content>
                    </Kbd>{" "}
                    to close this alert dialog.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button className="w-full" onPress={close}>
                    Got it
                  </Button>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog>
    </div>
  </div>
);

export const CustomIcon = () => (
  <AlertDialog>
    <Button variant="secondary">Reset Password</Button>
    <AlertDialog.Container>
      <AlertDialog.Dialog className="sm:max-w-[400px]">
        {({close}) => (
          <>
            <AlertDialog.Header>
              <AlertDialog.Icon status="warning">
                <Icon className="size-5" icon="gravity-ui:lock-open" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Reset your password?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                We'll send a password reset link to your email address. You'll need to create a new
                password to regain access to your account.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={close}>
                Cancel
              </Button>
              <Button onPress={close}>Send Reset Link</Button>
            </AlertDialog.Footer>
          </>
        )}
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  </AlertDialog>
);

export const CustomBackdrop = () => (
  <AlertDialog>
    <Button variant="danger">Delete Account</Button>
    <AlertDialog.Container
      backdropClassName="bg-gradient-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
      backdropVariant="blur"
    >
      <AlertDialog.Dialog className="sm:max-w-[420px]">
        {({close}) => (
          <>
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <Icon className="size-5" icon="gravity-ui:triangle-exclamation" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Permanently delete your account?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This action cannot be undone. All your data, settings, and content will be
                permanently removed from our servers. The dramatic red backdrop emphasizes the
                severity and irreversibility of this decision.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={close}>
                Keep Account
              </Button>
              <Button variant="danger" onPress={close}>
                Delete Forever
              </Button>
            </AlertDialog.Footer>
          </>
        )}
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  </AlertDialog>
);

export const CustomTrigger = () => (
  <AlertDialog>
    <AlertDialog.Trigger>
      <div className="border-border bg-surface hover:bg-surface-secondary group flex cursor-pointer items-center gap-3 rounded-2xl border p-4 shadow-sm transition-all hover:shadow">
        <div className="bg-danger-soft text-danger-soft-foreground flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
          <Icon className="size-6" icon="gravity-ui:trash-bin" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-foreground text-sm font-semibold leading-5">Delete Item</p>
          <p className="text-muted text-xs leading-relaxed">Permanently remove this item</p>
        </div>
      </div>
    </AlertDialog.Trigger>
    <AlertDialog.Container>
      <AlertDialog.Dialog className="sm:max-w-[400px]">
        {({close}) => (
          <>
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <Icon className="size-5" icon="gravity-ui:trash-bin" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Delete this item?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This item will be permanently deleted and cannot be recovered. Are you sure you want
                to proceed?
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={close}>
                Cancel
              </Button>
              <Button variant="danger" onPress={close}>
                Delete Item
              </Button>
            </AlertDialog.Footer>
          </>
        )}
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  </AlertDialog>
);

export const WithCloseButton = () => (
  <AlertDialog>
    <Button variant="secondary">Show Information</Button>
    <AlertDialog.Container isDismissable>
      <AlertDialog.Dialog className="sm:max-w-[400px]">
        {({close}) => (
          <>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="default">
                <Icon className="size-5" icon="gravity-ui:circle-info" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Less critical information</AlertDialog.Heading>
              <p className="text-muted text-sm leading-relaxed">
                Close button and backdrop dismiss are enabled
              </p>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                For less critical confirmations, you can enable both the close button and backdrop
                dismissal. This provides users with multiple ways to exit the dialog.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={close}>
                Cancel
              </Button>
              <Button onPress={close}>Confirm</Button>
            </AlertDialog.Footer>
          </>
        )}
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  </AlertDialog>
);

export const CustomAnimations = () => {
  const animations = [
    {
      classNames: [
        "data-[entering]:animate-in",
        "data-[entering]:zoom-in-95",
        "data-[entering]:fade-in-0",
        "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "data-[exiting]:animate-out",
        "data-[exiting]:zoom-out-95",
        "data-[exiting]:fade-out-0",
        "data-[exiting]:ease-out-quart",
      ].join(" "),
      description: "Smooth scale animation with elastic spring-like easing",
      icon: "gravity-ui:sparkles",
      name: "Smooth Scale",
    },
    {
      classNames: [
        "data-[entering]:animate-in",
        "data-[entering]:slide-in-from-bottom-4",
        "data-[entering]:fade-in-0",
        "data-[entering]:ease-fluid-out",
        "data-[exiting]:animate-out",
        "data-[exiting]:slide-out-to-bottom-2",
        "data-[exiting]:fade-out-0",
        "data-[exiting]:ease-in-quad",
      ].join(" "),
      description: "Gentle upward slide with seamless fade transition",
      icon: "gravity-ui:arrow-up-from-line",
      name: "Slide Up",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {animations.map(({classNames, description, icon, name}) => (
        <AlertDialog key={name}>
          <Button variant="secondary">{name}</Button>
          <AlertDialog.Container
            backdropClassName="data-[exiting]:duration-250"
            className={`data-[entering]:duration-300 data-[exiting]:duration-200 ${classNames}`}
          >
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent">
                      <Icon className="size-5" icon={icon} />
                    </AlertDialog.Icon>
                    <AlertDialog.Heading>{name} Animation</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p className="mt-1">
                      {description}. Customize entrance and exit animations using Tailwind's
                      animation utilities. Combine <code>data-[entering]</code> and{" "}
                      <code>data-[exiting]</code> states with custom timings and easing functions
                      for polished transitions.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      Close
                    </Button>
                    <Button onPress={close}>Try Again</Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      ))}
    </div>
  );
};
