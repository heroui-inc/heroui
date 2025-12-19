"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function BackdropVariants() {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal key={variant}>
          <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Backdrop variant={variant}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Rocket className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>
                    Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    This modal uses the <code>{variant}</code> backdrop variant. Compare the
                    different visual effects: opaque provides full opacity, blur adds a backdrop
                    filter, and transparent removes the background.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" slot="close">
                    Continue
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}
