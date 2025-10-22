"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function TestBlur() {
  return (
    <div className="flex gap-4">
      <Modal.Root>
        <Button>Open Blur Modal</Button>
        <Modal.Overlay variant="blur">
          <Modal.Container>
            <Modal.Dialog className="max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <div className="bg-default flex size-10 items-center justify-center rounded-full">
                  <Icon icon="gravity-ui:rocket" />
                </div>
                <h2 className="text-foreground text-lg font-semibold leading-6">
                  Blur Overlay Test
                </h2>
              </Modal.Header>
              <Modal.Body>
                <p>This modal should have a blurred backdrop.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Overlay>
      </Modal.Root>
    </div>
  );
}
