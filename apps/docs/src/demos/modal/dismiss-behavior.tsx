"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function DismissBehavior() {
  return (
    <div className="flex max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">isDismissable</h3>
        <p className="text-muted text-sm">
          Controls whether the modal can be dismissed by clicking the overlay backdrop. When set to{" "}
          <code>true</code>, clicking outside the modal will close it.
        </p>
        <Modal>
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
                  <p className="text-muted text-sm leading-5">
                    Click the overlay backdrop to close
                  </p>
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
        </Modal>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
        <p className="text-muted text-sm">
          Controls whether the ESC key can dismiss the modal. When set to <code>true</code>, the ESC
          key will be disabled and won't close the modal.
        </p>
        <Modal>
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
                    Press ESC - it won't close this modal. Use the close button or click the
                    overlay.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full">Close</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Overlay>
        </Modal>
      </div>
    </div>
  );
}
