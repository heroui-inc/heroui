"use client";

import {AlertDialog, Button, useOverlayState} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isOpen, setIsOpen] = useState(false);

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
}
