"use client";

import {Button, Modal, useOverlayState} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

export function Controlled() {
  const [isOpen, setIsOpen] = useState(false);

  const state = useOverlayState();

  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-foreground text-lg font-semibold">With React.useState()</h3>
        <p className="text-muted text-pretty text-sm leading-relaxed">
          Control the modal using React's <code className="text-foreground">useState</code> hook for
          simple state management. Perfect for basic use cases.
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
}
