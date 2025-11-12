"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Placements() {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Modal key={placement}>
          <Button>{placement.charAt(0).toUpperCase() + placement.slice(1)}</Button>
          <Modal.Backdrop>
            <Modal.Container placement={placement}>
              <Modal.Dialog className="max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <div className="bg-default flex size-10 items-center justify-center rounded-full">
                    <Icon icon="gravity-ui:rocket" />
                  </div>
                  <h2 className="text-foreground text-lg font-semibold leading-6">
                    Placement: {placement.charAt(0).toUpperCase() + placement.slice(1)}
                  </h2>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    This modal uses the <code>{placement}</code> placement option. Try different
                    placements to see how the modal positions itself on the screen.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full">Continue</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}
