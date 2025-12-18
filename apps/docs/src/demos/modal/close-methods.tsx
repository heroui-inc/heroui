"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CloseMethods() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Using slot="close"</h3>
        <p className="text-sm text-muted">
          The simplest way to close a modal. Add <code>slot="close"</code> to any Button component
          within the modal. When clicked, it will automatically close the modal.
        </p>
        <Modal>
          <Button variant="secondary">Open Modal</Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.Header>
                  <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                    <Icon className="size-5" icon="gravity-ui:circle-info" />
                  </Modal.Icon>
                  <Modal.Heading>Using slot="close"</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Click either button below - both have <code>slot="close"</code> and will close
                    the modal automatically.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>
                  <Button slot="close">Confirm</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Using Dialog render props</h3>
        <p className="text-sm text-muted">
          Access the <code>close</code> method from the Dialog's render props. This gives you full
          control over when and how to close the modal, allowing you to add custom logic before
          closing.
        </p>
        <Modal>
          <Button variant="secondary">Open Modal</Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                {(renderProps) => (
                  <>
                    <Modal.Header>
                      <Modal.Icon className="bg-success-soft text-success-soft-foreground">
                        <Icon className="size-5" icon="gravity-ui:circle-check" />
                      </Modal.Icon>
                      <Modal.Heading>Using Dialog render props</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        The buttons below use the <code>close</code> method from render props. You
                        can add validation or other logic before calling{" "}
                        <code>renderProps.close()</code>.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onPress={() => renderProps.close()}>
                        Cancel
                      </Button>
                      <Button onPress={() => renderProps.close()}>Confirm</Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </div>
  );
}
