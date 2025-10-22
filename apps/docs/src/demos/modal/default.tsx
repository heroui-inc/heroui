"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Default() {
  return (
    <Modal.Root>
      <Button>Open Modal</Button>
      <Modal.Overlay>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <div className="bg-default ring-muted/25 flex size-10 items-center justify-center rounded-full ring-1">
                <Icon className="size-5" icon="gravity-ui:rocket" />
              </div>
              <h2 className="text-foreground text-lg font-semibold leading-6">Welcome to HeroUI</h2>
            </Modal.Header>
            <Modal.Body>
              <p>
                Beautiful, fast and modern React UI library for building accessible and customizable
                web applications.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full">Continue</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Overlay>
    </Modal.Root>
  );
}
