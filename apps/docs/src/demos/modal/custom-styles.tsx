"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomStyles() {
  return (
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
              <p>
                You can fully customize the backdrop with any Tailwind classes or custom styles.
              </p>
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
}
