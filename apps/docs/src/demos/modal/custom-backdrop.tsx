"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomBackdrop() {
  return (
    <Modal>
      <Button>Custom Backdrop</Button>
      <Modal.Backdrop
        className="bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
        variant="blur"
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            {({close}) => (
              <>
                <Modal.Header className="items-center text-center">
                  <div className="bg-accent-soft text-accent-soft-foreground flex size-10 items-center justify-center rounded-full">
                    <Icon className="size-5" icon="gravity-ui:sparkles" />
                  </div>
                  <h2 className="text-foreground text-lg font-semibold leading-6">
                    Premium Backdrop
                  </h2>
                  <p className="text-muted text-sm leading-5">
                    Elegant gradient that adapts to light and dark modes
                  </p>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    This backdrop features a sophisticated gradient that transitions from a dark
                    color at the bottom to complete transparency at the top, combined with a smooth
                    blur effect. The gradient automatically adapts its intensity for optimal
                    contrast in both light and dark modes.
                  </p>
                </Modal.Body>
                <Modal.Footer className="flex-col-reverse">
                  <Button className="w-full" onPress={close}>
                    Amazing!
                  </Button>
                  <Button className="w-full" variant="secondary" onPress={close}>
                    Close
                  </Button>
                </Modal.Footer>
                <Modal.CloseTrigger />
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
