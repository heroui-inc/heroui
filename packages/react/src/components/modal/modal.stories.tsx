import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {useOverlayState} from "../../hooks/use-overlay-state";
import {Button} from "../button";
import {Input} from "../input";
import {Label} from "../label";
import {Radio} from "../radio";
import {RadioGroup} from "../radio-group";
import {Surface} from "../surface";
import {TextField} from "../text-field";

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
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[360px]">
          {({close}) => (
            <>
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <Icon className="size-5" icon="gravity-ui:rocket" />
                </Modal.Icon>
                <Modal.Heading>Welcome to HeroUI</Modal.Heading>
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
          <Modal.Container placement={placement}>
            <Modal.Dialog className="sm:max-w-[360px]">
              {({close}) => (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      <Icon className="size-5" icon="gravity-ui:rocket" />
                    </Modal.Icon>
                    <Modal.Heading>
                      Placement: {placement.charAt(0).toUpperCase() + placement.slice(1)}
                    </Modal.Heading>
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
        </Modal>
      ))}
    </div>
  );
};

export const BackdropVariants = () => {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal key={variant}>
          <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Container variant={variant}>
            <Modal.Dialog className="sm:max-w-[360px]">
              {({close}) => (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      <Icon className="size-5" icon="gravity-ui:rocket" />
                    </Modal.Icon>
                    <Modal.Heading>
                      Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      This modal uses the <code>{variant}</code> backdrop variant. Compare the
                      different visual effects: opaque provides full opacity, blur adds a backdrop
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
        </Modal>
      ))}
    </div>
  );
};

export const DismissBehavior = () => (
  <div className="flex max-w-sm flex-col gap-6">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isDismissable</h3>
      <p className="text-sm text-muted">
        Controls whether the modal can be dismissed by clicking the overlay backdrop. Defaults to{" "}
        <code>true</code>. Set to <code>false</code> to require explicit close action.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Container isDismissable={false}>
          <Modal.Dialog className="sm:max-w-[360px]">
            {({close}) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon="gravity-ui:circle-info" />
                  </Modal.Icon>
                  <Modal.Heading>isDismissable = false</Modal.Heading>
                  <p className="text-sm leading-5 text-muted">
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
      </Modal>
    </div>

    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
      <p className="text-sm text-muted">
        Controls whether the ESC key can dismiss the modal. When set to <code>true</code>, the ESC
        key will be disabled and users must use explicit close actions.
      </p>
      <Modal>
        <Button variant="secondary">Open Modal</Button>
        <Modal.Container isKeyboardDismissDisabled>
          <Modal.Dialog className="sm:max-w-[360px]">
            {({close}) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon="gravity-ui:circle-info" />
                  </Modal.Icon>
                  <Modal.Heading>isKeyboardDismissDisabled = true</Modal.Heading>
                  <p className="text-sm leading-5 text-muted">ESC key is disabled</p>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Press ESC - nothing happens. You must use the close button or click the overlay
                    backdrop to dismiss this modal.
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
      </Modal>
    </div>
  </div>
);

export const ScrollComparison = () => {
  const [scroll, setScroll] = useState<"inside" | "outside">("inside");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        orientation="horizontal"
        value={scroll}
        onChange={(value) => setScroll(value as "inside" | "outside")}
      >
        <Radio value="inside">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>Inside</Label>
        </Radio>
        <Radio value="outside">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>Outside</Label>
        </Radio>
      </RadioGroup>

      <Modal>
        <Button variant="secondary">
          Open Modal ({scroll.charAt(0).toUpperCase() + scroll.slice(1)})
        </Button>
        <Modal.Container scroll={scroll}>
          <Modal.Dialog className="sm:max-w-[360px]">
            {({close}) => (
              <>
                <Modal.Header>
                  <Modal.Heading>
                    Scroll: {scroll.charAt(0).toUpperCase() + scroll.slice(1)}
                  </Modal.Heading>
                  <p className="text-sm leading-5 text-muted">
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
      </Modal>
    </div>
  );
};

export const WithForm = () => (
  <Modal>
    <Button variant="secondary">Open Contact Form</Button>
    <Modal.Container placement="auto">
      <Modal.Dialog className="sm:max-w-md">
        {({close}) => (
          <>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Icon className="size-5" icon="gravity-ui:envelope" />
              </Modal.Icon>
              <Modal.Heading>Contact Us</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below and we'll get back to you. The modal adapts automatically
                when the keyboard appears on mobile.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
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
  </Modal>
);

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const state = useOverlayState();

  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">With React.useState()</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Control the modal using React's <code className="text-foreground">useState</code> hook for
          simple state management. Perfect for basic use cases.
        </p>
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-xs text-muted">
              Status:{" "}
              <span className="font-mono font-medium text-foreground">
                {isOpen ? "open" : "closed"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
              Open Modal
            </Button>
            <Button size="sm" variant="tertiary" onPress={() => setIsOpen(!isOpen)}>
              Toggle
            </Button>
          </div>
        </div>

        <Modal.Container isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Dialog className="sm:max-w-[360px]">
            {({close}) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                    <Icon className="size-5" icon="gravity-ui:circle-check" />
                  </Modal.Icon>
                  <Modal.Heading>Controlled with useState()</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    This modal is controlled by React's <code>useState</code> hook. Pass{" "}
                    <code>isOpen</code> and <code>onOpenChange</code> props to manage the modal
                    state externally.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onPress={close}>
                    Cancel
                  </Button>
                  <Button onPress={close}>Confirm</Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">With useOverlayState()</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Use the <code className="text-foreground">useOverlayState</code> hook for a cleaner API
          with convenient methods like <code>open()</code>, <code>close()</code>, and{" "}
          <code>toggle()</code>.
        </p>
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-xs text-muted">
              Status:{" "}
              <span className="font-mono font-medium text-foreground">
                {state.isOpen ? "open" : "closed"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={state.open}>
              Open Modal
            </Button>
            <Button size="sm" variant="tertiary" onPress={state.toggle}>
              Toggle
            </Button>
          </div>
        </div>

        <Modal.Container isOpen={state.isOpen} onOpenChange={state.setOpen}>
          <Modal.Dialog className="sm:max-w-[360px]">
            {({close}) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-success-soft text-success-soft-foreground">
                    <Icon className="size-5" icon="gravity-ui:circle-check" />
                  </Modal.Icon>
                  <Modal.Heading>Controlled with useOverlayState()</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    The <code>useOverlayState</code> hook provides dedicated methods for common
                    operations. No need to manually create callbacks—just use{" "}
                    <code>state.open()</code>, <code>state.close()</code>, or{" "}
                    <code>state.toggle()</code>.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onPress={close}>
                    Cancel
                  </Button>
                  <Button onPress={close}>Confirm</Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </div>
    </div>
  );
};

export const CustomTrigger = () => (
  <Modal>
    <Modal.Trigger>
      <div className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all hover:bg-surface-secondary hover:shadow">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-foreground transition-transform group-hover:scale-105">
          <Icon className="size-6" icon="gravity-ui:gear" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm leading-5 font-semibold text-foreground">Settings</p>
          <p className="text-xs leading-relaxed text-muted">Manage your preferences</p>
        </div>
      </div>
    </Modal.Trigger>
    <Modal.Container>
      <Modal.Dialog className="sm:max-w-[360px]">
        {({close}) => (
          <>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Icon className="size-5" icon="gravity-ui:gear" />
              </Modal.Icon>
              <Modal.Heading>Settings</Modal.Heading>
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
          </>
        )}
      </Modal.Dialog>
    </Modal.Container>
  </Modal>
);

export const CustomBackdrop = () => (
  <Modal>
    <Button variant="secondary">Custom Backdrop</Button>
    <Modal.Container
      backdropClassName="bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
      variant="blur"
    >
      <Modal.Dialog className="sm:max-w-[360px]">
        {({close}) => (
          <>
            <Modal.Header className="items-center text-center">
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Icon className="size-5" icon="gravity-ui:sparkles" />
              </Modal.Icon>
              <Modal.Heading>Premium Backdrop</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                This backdrop features a sophisticated gradient that transitions from a dark color
                at the bottom to complete transparency at the top, combined with a smooth blur
                effect. The gradient automatically adapts its intensity for optimal contrast in both
                light and dark modes.
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
  </Modal>
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
        "data-[entering]:ease-out-fluid",
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
        <Modal key={name}>
          <Button variant="secondary">{name}</Button>
          <Modal.Container
            backdropClassName="data-[exiting]:duration-250"
            className={`data-[entering]:duration-300 data-[exiting]:duration-200 ${classNames}`}
          >
            <Modal.Dialog className="sm:max-w-[360px]">
              {({close}) => (
                <>
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      <Icon className="size-5" icon={icon} />
                    </Modal.Icon>
                    <Modal.Heading>{name} Animation</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="mt-1">
                      {description}. Customize entrance and exit animations using Tailwind's
                      animation utilities. Combine <code>data-[entering]</code> and{" "}
                      <code>data-[exiting]</code> states with custom timings and easing functions
                      for polished transitions.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="tertiary" onPress={close}>
                      Close
                    </Button>
                    <Button onPress={close}>Try Again</Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal>
      ))}
    </div>
  );
};
