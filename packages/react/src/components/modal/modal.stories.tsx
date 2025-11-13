import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import clsx from "clsx";
import React, {useState} from "react";

import {Button} from "../button";
import {Input} from "../input";
import {Label} from "../label";
import {Surface} from "../surface";
import {TextField} from "../text-field";

import {useModalState} from "./use-modal";

import {Modal} from "./index";

export default {
  argTypes: {},
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Overlays/Modal",
} as Meta<typeof Modal>;

export const Default = () => {
  return (
    <Modal>
      <Button variant="secondary">Open Modal</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            {({close}) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                    <Icon className="size-5" icon="gravity-ui:rocket" />
                  </div>
                  <h2 className="text-foreground text-lg font-semibold leading-6">
                    Welcome to HeroUI
                  </h2>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    A beautiful, fast, and modern React UI library for building accessible and
                    customizable web applications with ease.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" onPress={close}>
                    Continue
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export const Placements = () => {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Modal key={placement}>
          <Button variant="secondary">
            {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Button>
          <Modal.Backdrop>
            <Modal.Container placement={placement}>
              <Modal.Dialog className="sm:max-w-[360px]">
                {({close}) => (
                  <>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <div className="bg-default flex size-10 items-center justify-center rounded-full">
                        <Icon icon="gravity-ui:rocket" />
                      </div>
                      <h2 className="text-foreground text-lg font-semibold leading-6">
                        Placement: {placement.charAt(0).toUpperCase() + placement.slice(1)}
                      </h2>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        This modal uses the <code>{placement}</code> placement option. Try different
                        placements to see how the modal positions itself on the screen.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="w-full" onPress={close}>
                        Continue
                      </Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
};

export const OverlayVariants = () => {
  const variants = ["solid", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal key={variant}>
          <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Backdrop variant={variant}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                {({close}) => (
                  <>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <div className="bg-default flex size-10 items-center justify-center rounded-full">
                        <Icon icon="gravity-ui:rocket" />
                      </div>
                      <h2 className="text-foreground text-lg font-semibold leading-6">
                        Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </h2>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        This modal uses the <code>{variant}</code> backdrop variant. Compare the
                        different visual effects: solid provides full opacity, blur adds a backdrop
                        filter, and transparent removes the background.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="w-full" onPress={close}>
                        Continue
                      </Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
};

export const DismissBehavior = () => (
  <div className="flex max-w-sm flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isDismissable</h3>
      <p className="text-muted text-sm">
        Controls whether the modal can be dismissed by clicking the overlay backdrop. Defaults to{" "}
        <code>true</code>. Set to <code>false</code> to require explicit close action.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Backdrop isDismissable={false}>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              {({close}) => (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                      <Icon className="size-5" icon="gravity-ui:circle-info" />
                    </div>
                    <h2 className="text-foreground text-lg font-semibold leading-6">
                      isDismissable = false
                    </h2>
                    <p className="text-muted text-sm leading-5">
                      Clicking the backdrop won't close this modal
                    </p>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Try clicking outside this modal on the overlay - it won't close. You must use
                      the close button or press ESC to dismiss it.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="w-full" onPress={close}>
                      Close
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
      <p className="text-muted text-sm">
        Controls whether the ESC key can dismiss the modal. When set to <code>true</code>, the ESC
        key will be disabled and users must use explicit close actions.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Backdrop isKeyboardDismissDisabled>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              {({close}) => (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                      <Icon className="size-5" icon="gravity-ui:circle-info" />
                    </div>
                    <h2 className="text-foreground text-lg font-semibold leading-6">
                      isKeyboardDismissDisabled = true
                    </h2>
                    <p className="text-muted text-sm leading-5">ESC key is disabled</p>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Press ESC - nothing happens. You must use the close button or click the
                      overlay backdrop to dismiss this modal.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="w-full" onPress={close}>
                      Close
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  </div>
);

export const ScrollComparison = () => {
  const [scroll, setScroll] = useState<"inside" | "outside">("inside");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            checked={scroll === "inside"}
            name="scroll"
            type="radio"
            value="inside"
            onChange={(e) => setScroll(e.target.value as "inside" | "outside")}
          />
          Inside
        </label>

        <label className="flex items-center gap-2">
          <input
            checked={scroll === "outside"}
            name="scroll"
            type="radio"
            value="outside"
            onChange={(e) => setScroll(e.target.value as "inside" | "outside")}
          />
          Outside
        </label>
      </div>

      <Modal>
        <Button variant="secondary">
          Open Modal ({scroll.charAt(0).toUpperCase() + scroll.slice(1)})
        </Button>
        <Modal.Backdrop>
          <Modal.Container scroll={scroll}>
            <Modal.Dialog className="sm:max-w-[360px]">
              {({close}) => (
                <>
                  <Modal.Header>
                    <h2 className="text-foreground text-lg font-semibold leading-6">
                      Scroll: {scroll.charAt(0).toUpperCase() + scroll.slice(1)}
                    </h2>
                    <p className="text-muted text-sm leading-5">
                      Compare scroll behaviors - inside keeps content scrollable within the modal,
                      outside allows page scrolling
                    </p>
                  </Modal.Header>
                  <Modal.Body>
                    {Array.from({length: 30}).map((_, i) => (
                      <p key={i} className="mb-3">
                        Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                      </p>
                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onPress={close}>
                      Cancel
                    </Button>
                    <Button onPress={close}>Confirm</Button>
                  </Modal.Footer>
                  <Modal.CloseTrigger />
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export const WithForm = () => (
  <Modal>
    <Button variant="secondary">Open Contact Form</Button>
    <Modal.Backdrop>
      <Modal.Container placement="auto">
        <Modal.Dialog className="sm:max-w-md">
          {({close}) => (
            <>
              <Modal.CloseTrigger />
              <Modal.Header className="gap-2">
                <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" icon="gravity-ui:envelope" />
                </div>
                <div>
                  <h2 className="text-foreground text-lg font-semibold leading-6">Contact Us</h2>
                  <p className="text-muted mt-1 text-sm leading-5">
                    Fill out the form below and we'll get back to you.
                  </p>
                </div>
              </Modal.Header>
              <Modal.Body className="py-2">
                <Surface variant="default">
                  <form className="flex flex-col gap-3">
                    <TextField className="w-full" name="name" type="text">
                      <Label>Name</Label>
                      <Input placeholder="Enter your name" />
                    </TextField>

                    <TextField className="w-full" name="email" type="email">
                      <Label>Email</Label>
                      <Input placeholder="Enter your email" />
                    </TextField>

                    <TextField className="w-full" name="phone" type="tel">
                      <Label>Phone</Label>
                      <Input placeholder="Enter your phone number" />
                    </TextField>

                    <TextField className="w-full" name="company">
                      <Label>Company</Label>
                      <Input placeholder="Enter your company name" />
                    </TextField>

                    <TextField className="w-full" name="message">
                      <Label>Message</Label>
                      <Input placeholder="Enter your message" />
                    </TextField>
                  </form>
                </Surface>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Send Message</Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export const WithUseModalState = () => {
  const modalState = useModalState();

  return (
    <div className="flex flex-col gap-4">
      <div className="border-border bg-default rounded-lg border p-4">
        <p className="mb-2 text-sm font-medium">Modal State</p>
        <p className="text-muted text-sm">
          Status: <span className="font-mono">{modalState.isOpen ? "open" : "closed"}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onPress={modalState.open}>
          Open Modal
        </Button>
        <Button variant="secondary" onPress={modalState.toggle}>
          Toggle Modal
        </Button>
      </div>

      <Modal state={modalState}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.Header>
                <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" icon="gravity-ui:circle-check" />
                </div>
                <h2 className="text-foreground text-lg font-semibold leading-6">
                  Controlled with useModalState()
                </h2>
                <p className="text-muted text-sm leading-5">
                  This modal is controlled programmatically using the useModalState() hook
                </p>
              </Modal.Header>
              <Modal.Body>
                <p>
                  The hook provides methods like <code>open()</code>, <code>close()</code>, and{" "}
                  <code>toggle()</code>, along with access to the <code>isOpen</code> state.
                </p>
                <p className="mt-3">
                  This enables powerful patterns like opening modals from anywhere in your component
                  tree, handling multiple triggers, and integrating with external state management.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onPress={modalState.close}>
                  Close
                </Button>
                <Button onPress={modalState.close}>Confirm</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export const CustomTrigger = () => (
  <Modal>
    <Modal.Trigger>
      <div className="border-border bg-default hover:bg-default-hover flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors">
        <div className="flex size-10 items-center justify-center">
          <Icon className="text-primary size-6" icon="gravity-ui:gear" />
        </div>
        <div>
          <p className="font-medium">Settings</p>
          <p className="text-muted text-sm">Click to open settings</p>
        </div>
      </div>
    </Modal.Trigger>
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[360px]">
          {({close}) => (
            <>
              <Modal.Header>
                <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" icon="gravity-ui:gear" />
                </div>
                <h2 className="text-foreground text-lg font-semibold leading-6">Settings</h2>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Use <code>Modal.Trigger</code> to create custom trigger elements beyond standard
                  buttons. This example shows a card-style trigger with icons and descriptive text.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Save</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export const CustomBackdrop = () => (
  <Modal>
    <Button variant="secondary">Custom Backdrop</Button>
    <Modal.Backdrop
      className="bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
      variant="blur"
    >
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[360px]">
          {({close}) => (
            <>
              <Modal.Header className="items-center text-center">
                <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" icon="gravity-ui:sparkles" />
                </div>
                <h2 className="text-foreground text-lg font-semibold leading-6">
                  Premium Backdrop
                </h2>
                <p className="text-muted text-sm leading-5">
                  Elegant gradient that adapts to light and dark modes
                </p>
              </Modal.Header>
              <Modal.Body>
                <p>
                  This backdrop features a sophisticated gradient that transitions from a dark color
                  at the bottom to complete transparency at the top, combined with a smooth blur
                  effect. The gradient automatically adapts its intensity for optimal contrast in
                  both light and dark modes.
                </p>
              </Modal.Body>
              <Modal.Footer className="flex-col-reverse">
                <Button className="w-full" onPress={close}>
                  Amazing!
                </Button>
                <Button className="w-full" variant="secondary" onPress={close}>
                  Close
                </Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);

export const CustomAnimations = () => {
  const animations = {
    Spring: [
      "data-[entering]:zoom-in-90",
      "data-[entering]:ease-spring",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:ease-out-quart",
    ].join(" "),
    Blur_Slide: [
      "data-[entering]:blur-in-8",
      "data-[entering]:slide-in-from-bottom-8",
      "data-[entering]:fade-in-0",
      "data-[exiting]:blur-out-8",
      "data-[exiting]:slide-out-to-bottom-8",
      "data-[exiting]:fade-out-0",
      "",
    ].join(" "),
    Bounce: [
      "data-[entering]:zoom-in-50",
      "data-[entering]:fade-in-0",
      "data-[entering]:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:fade-out-0",
    ].join(" "),
    RotateZoom: [
      "data-[entering]:zoom-in-75",
      "data-[entering]:spin-in-45",
      "data-[entering]:fade-in-0",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:spin-out-12",
      "data-[exiting]:fade-out-0",
    ].join(" "),
  };

  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(animations).map(([name, classNames]) => (
        <Modal key={name}>
          <Button variant="secondary">{name.replace("_", " ")}</Button>
          <Modal.Backdrop className="data-[exiting]:duration-200">
            <Modal.Container
              className={clsx(
                "data-[entering]:duration-[350ms]",
                "data-[exiting]:duration-200",
                classNames,
              )}
            >
              <Modal.Dialog className="sm:max-w-[360px]">
                {({close}) => (
                  <>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                        <Icon className="size-5" icon="gravity-ui:rocket" />
                      </div>
                      <h2 className="text-foreground text-lg font-semibold leading-6">
                        {name.replace("_", " ")} Animation
                      </h2>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        Customize your modal's entrance and exit animations using Tailwind's
                        animation utilities. This example demonstrates the{" "}
                        {name.replace("_", " ").toLowerCase()} animation style.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="w-full" onPress={close}>
                        Continue
                      </Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
};
