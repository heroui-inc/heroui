"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function BackdropVariants() {
  const variants = ["solid", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal key={variant}>
          <Button>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Backdrop variant={variant}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                {({close}) => (
                  <>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <div className="bg-default flex size-10 items-center justify-center rounded-full">
                        <Icon icon="gravity-ui:rocket" />
                      </div>
                      <h2 className="text-foreground text-lg font-semibold leading-6">
                        Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </h2>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        This modal uses the <code>{variant}</code> backdrop variant. Compare the
                        different visual effects: solid provides full opacity, blur adds a backdrop
                        filter, and transparent removes the background.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="w-full" onPress={close}>
                        Continue
                      </Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}
