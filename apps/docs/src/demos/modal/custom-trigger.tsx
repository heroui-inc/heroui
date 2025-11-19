"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomTrigger() {
  return (
    <Modal>
      <Modal.Trigger>
        <div className="border-border bg-surface hover:bg-surface-secondary group flex cursor-pointer items-center gap-3 rounded-2xl border p-4 shadow-sm transition-all hover:shadow">
          <div className="bg-accent-soft text-accent-soft-foreground flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
            <Icon className="size-6" icon="gravity-ui:gear" />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-foreground text-sm font-semibold leading-5">Settings</p>
            <p className="text-muted text-xs leading-relaxed">Manage your preferences</p>
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
}
