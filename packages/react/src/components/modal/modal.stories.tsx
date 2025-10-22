import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import clsx from "clsx";
import React, {useState} from "react";

import {Button} from "../button";
import {Input} from "../input";
import {Label} from "../label";
import {TextField} from "../text-field";

import {useModalState} from "./use-modal";

import {Modal} from "./index";

export default {
  argTypes: {},
  component: Modal.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Overlays/Modal",
} as Meta<typeof Modal>;

export const Default = () => {
  return (
    <Modal.Root>
      <Button>Open Modal</Button>
      <Modal.Overlay>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                <Icon className="size-5" icon="gravity-ui:rocket" />
              </div>
              <h2 className="text-foreground text-lg font-semibold leading-6">Welcome to HeroUI</h2>
            </Modal.Header>
            <Modal.Body>
              <p>
                Beautiful, fast and modern React UI library for building accessible and customizable
                web applications.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">Continue</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Overlay>
    </Modal.Root>
  );
};

export const Placements = () => {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Modal.Root key={placement}>
          <Button>{placement.charAt(0).toUpperCase() + placement.slice(1)}</Button>
          <Modal.Overlay>
            <Modal.Container placement={placement}>
              <Modal.Dialog className="max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <div className="bg-default flex size-10 items-center justify-center rounded-full">
                    <Icon icon="gravity-ui:rocket" />
                  </div>
                  <h2 className="text-foreground text-lg font-semibold leading-6">
                    Welcome to HeroUI
                  </h2>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Beautiful, fast and modern React UI library for building accessible and
                    customizable web applications.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full">Continue</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Overlay>
        </Modal.Root>
      ))}
    </div>
  );
};

export const OverlayVariants = () => {
  const variants = ["solid", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal.Root key={variant}>
          <Button>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Overlay variant={variant}>
            <Modal.Container>
              <Modal.Dialog className="max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <div className="bg-default flex size-10 items-center justify-center rounded-full">
                    <Icon icon="gravity-ui:rocket" />
                  </div>
                  <h2 className="text-foreground text-lg font-semibold leading-6">
                    Welcome to HeroUI
                  </h2>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Beautiful, fast and modern React UI library for building accessible and
                    customizable web applications.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full">Continue</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Overlay>
        </Modal.Root>
      ))}
    </div>
  );
};

export const DismissBehavior = () => (
  <div className="flex max-w-sm flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isDismissable</h3>
      <p className="text-muted text-sm">
        Controls whether the modal can be dismissed by clicking the overlay backdrop. When set to{" "}
        <code>true</code>, clicking outside the modal will close it.
      </p>
      <Modal.Root>
        <Button>Open Modal</Button>
        <Modal.Overlay isDismissable>
          <Modal.Container>
            <Modal.Dialog className="max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                  <Icon className="size-5" icon="gravity-ui:circle-info" />
                </div>
                <h2 className="text-foreground text-lg font-semibold leading-6">
                  isDismissable = true
                </h2>
                <p className="text-muted text-sm leading-5">Click the overlay backdrop to close</p>
              </Modal.Header>
              <Modal.Body>
                <p>Click anywhere outside this modal (on the dark overlay) to dismiss it.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Overlay>
      </Modal.Root>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
      <p className="text-muted text-sm">
        Controls whether the ESC key can dismiss the modal. When set to <code>true</code>, the ESC
        key will be disabled and won't close the modal.
      </p>
      <Modal.Root>
        <Button>Open Modal</Button>
        <Modal.Overlay isKeyboardDismissDisabled>
          <Modal.Container>
            <Modal.Dialog className="max-w-[360px]">
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
                  Press ESC - it won't close this modal. Use the close button or click the overlay.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Overlay>
      </Modal.Root>
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

      <Modal.Root>
        <Button>Open Modal ({scroll.charAt(0).toUpperCase() + scroll.slice(1)})</Button>
        <Modal.Overlay>
          <Modal.Container scroll={scroll}>
            <Modal.Dialog>
              <Modal.Header>
                <h2 className="text-foreground text-lg font-semibold leading-6">
                  Scroll: {scroll.charAt(0).toUpperCase() + scroll.slice(1)}
                </h2>
                <p className="text-muted text-sm leading-5">
                  Toggle the radio buttons above to see different scroll behaviors
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
                <Button variant="secondary">Cancel</Button>
                <Button>Confirm</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Overlay>
      </Modal.Root>
    </div>
  );
};

export const WithForm = () => (
  <Modal.Root>
    <Button>Open Contact Form</Button>
    <Modal.Overlay>
      <Modal.Container placement="auto">
        <Modal.Dialog className="sm:max-w-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
              <Icon className="size-5" icon="gravity-ui:envelope" />
            </div>
            <h2 className="text-foreground text-lg font-semibold leading-6">Contact Us</h2>
            <p className="text-muted text-sm leading-5">
              Fill out the form below. On mobile, the modal will adapt when the keyboard appears.
            </p>
          </Modal.Header>
          <Modal.Body>
            <form className="flex flex-col gap-4">
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
          </Modal.Body>
          <Modal.Footer>
            <Modal.CloseTrigger asChild>
              <Button variant="secondary">Cancel</Button>
            </Modal.CloseTrigger>
            <Button>Send Message</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Overlay>
  </Modal.Root>
);

export const WithUseModalState = () => {
  const modalState = useModalState();

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <p className="mb-2 text-sm font-medium">Modal State</p>
        <p className="text-sm text-neutral-600">
          Status: <span className="font-mono">{modalState.isOpen ? "open" : "closed"}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onPress={modalState.open}>Open Modal</Button>
        <Button variant="secondary" onPress={modalState.toggle}>
          Toggle Modal
        </Button>
      </div>

      <Modal.Root state={modalState}>
        <Modal.Overlay>
          <Modal.Container>
            <Modal.Dialog>
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
                  The hook provides methods like <code>open()</code>, <code>close()</code>,{" "}
                  <code>toggle()</code>, and access to <code>isOpen</code> state.
                </p>
                <p className="mt-3">
                  This enables powerful patterns like opening modals from anywhere in your
                  component, multiple triggers, and external state management.
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
        </Modal.Overlay>
      </Modal.Root>
    </div>
  );
};

export const CustomTrigger = () => (
  <Modal.Root>
    <Modal.Trigger>
      <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50">
        <div className="flex size-10 items-center justify-center">
          <Icon className="text-primary size-6" icon="gravity-ui:gear" />
        </div>
        <div>
          <p className="font-medium">Settings</p>
          <p className="text-muted text-sm">Click to open settings</p>
        </div>
      </div>
    </Modal.Trigger>
    <Modal.Overlay>
      <Modal.Container>
        <Modal.Dialog>
          {({close}) => (
            <>
              <Modal.Header>
                <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                  <Icon className="size-5" icon="gravity-ui:gear" />
                </div>
                <h2 className="text-foreground text-lg font-semibold leading-6">Settings</h2>
              </Modal.Header>
              <Modal.Body>
                <p>Using Modal.Trigger allows you to create custom trigger elements.</p>
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
    </Modal.Overlay>
  </Modal.Root>
);

export const CustomBackdrop = () => (
  <Modal.Root>
    <Button>Custom Backdrop</Button>
    <Modal.Overlay className="bg-transparent bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md">
      <Modal.Container>
        <Modal.Dialog>
          <Modal.Header className="items-center text-center">
            <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
              <Icon className="size-5" icon="gravity-ui:sparkles" />
            </div>
            <h2 className="text-foreground text-lg font-semibold leading-6">Custom Backdrop</h2>
            <p className="text-muted text-sm leading-5">
              This modal has a custom gradient backdrop
            </p>
          </Modal.Header>
          <Modal.Body>
            <p>You can fully customize the backdrop with any Tailwind classes or custom styles.</p>
          </Modal.Body>
          <Modal.Footer className="flex-col-reverse">
            <Button className="w-full">Amazing!</Button>
            <Button className="w-full" variant="secondary">
              Close
            </Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Overlay>
  </Modal.Root>
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
      "data-[exiting]:fade-out",
      "",
    ].join(" "),
    Bounce: [
      "data-[entering]:zoom-in-50",
      "data-[entering]:fade-in-0",
      "data-[entering]:ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:fade-out",
      "data-[exiting]:duration-200",
    ].join(" "),
    RotateZoom: [
      "data-[entering]:zoom-in-75",
      "data-[entering]:spin-in-45",
      "data-[entering]:fade-in-0",
      "data-[exiting]:zoom-out-95",
      "data-[exiting]:spin-out-12",
      "data-[exiting]:fade-out",
    ].join(" "),
  };

  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(animations).map(([name, classNames]) => (
        <Modal.Root key={name}>
          <Button>{name.replace("_", " ")}</Button>
          <Modal.Overlay className="data-[entering]:duration-500 data-[exiting]:duration-200">
            <Modal.Container
              className={clsx(
                classNames,
                "data-[entering]:animate-in",
                "data-[exiting]:animate-out",
                "data-[entering]:duration-500",
                "data-[exiting]:duration-200",
              )}
            >
              <Modal.Dialog className="sm:max-w-[360px]">
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
                    Beautiful, fast and modern React UI library for building accessible and
                    customizable web applications.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full">Continue</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Overlay>
        </Modal.Root>
      ))}
    </div>
  );
};
