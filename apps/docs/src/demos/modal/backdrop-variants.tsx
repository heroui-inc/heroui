"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function BackdropVariants() {
  const variants = ["solid", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Modal key={variant}>
          <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Modal.Container variant={variant}>
            <Modal.Dialog className="sm:max-w-[360px]">
              {({close}) => (
                <>
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      <Icon className="size-5" icon="gravity-ui:rocket" />
                    </Modal.Icon>
                    <Modal.Heading>
                      Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Modal.Heading>
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
        </Modal>
      ))}
    </div>
  );
}
