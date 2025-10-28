"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomTrigger() {
  return (
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
    </Modal>
  );
}
