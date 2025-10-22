"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function OverlayVariants() {
  const variants = ["solid", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal.Root key={variant}>
          <Button>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Overlay variant={variant}>
            <Modal.Container>
              <Modal.Dialog className="max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <div className="bg-default flex size-10 items-center justify-center rounded-full">
                    <Icon icon="gravity-ui:rocket" />
                  </div>
                  <h2 className="text-foreground text-lg font-semibold leading-6">
                    Welcome to HeroUI
                  </h2>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Beautiful, fast and modern React UI library for building accessible and
                    customizable web applications.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full">Continue</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Overlay>
        </Modal.Root>
      ))}
    </div>
  );
}
