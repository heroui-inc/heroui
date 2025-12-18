"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function DismissBehavior() {
  return (
    <div className="flex max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">isDismissable</h3>
        <p className="text-sm text-muted">
          Controls whether the modal can be dismissed by clicking the overlay backdrop. Defaults to{" "}
          <code>true</code>. Set to <code>false</code> to require explicit close action.
        </p>
        <Modal>
          <Button variant="secondary">Open Modal</Button>
          <Modal.Backdrop isDismissable={false}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
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
                  <Button className="w-full" slot="close">
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
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
          <Modal.Backdrop isKeyboardDismissDisabled>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
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
                  <Button className="w-full" slot="close">
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </div>
  );
}
