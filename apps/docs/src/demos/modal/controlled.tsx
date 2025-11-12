"use client";

import {Button, Modal, useModalState} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Controlled() {
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
        <Button onPress={modalState.open}>Open Modal</Button>
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
}
