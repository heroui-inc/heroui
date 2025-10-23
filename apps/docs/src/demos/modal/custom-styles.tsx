"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomStyles() {
  return (
    <Modal.Root>
      <Button>Custom Backdrop</Button>
      <Modal.Overlay className="bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-md">
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header className="items-center text-center">
              <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                <Icon className="size-5" icon="gravity-ui:sparkles" />
              </div>
              <h2 className="text-foreground text-lg font-semibold leading-6">Premium Backdrop</h2>
              <p className="text-muted text-sm leading-5">
                Elegant gradient from dark to transparent with blur
              </p>
            </Modal.Header>
            <Modal.Body>
              <p>
                This backdrop features a sophisticated gradient that transitions from an elegant
                black at the bottom to complete transparency at the top, combined with a smooth blur
                effect for a premium visual experience.
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
