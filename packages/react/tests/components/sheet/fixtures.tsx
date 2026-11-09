import type {ComponentPropsWithRef, ReactNode} from "react";

import {useState} from "react";

import {Button} from "@/components/button";
import {Modal} from "@/components/modal";
import {Sheet} from "@/components/sheet";

export function SheetFixture({
  backdropProps,
  children,
  closeProps,
  contentProps,
  dialogProps,
  ...props
}: Sheet["Props"] & {
  backdropProps?: Sheet["BackdropProps"];
  closeProps?: ComponentPropsWithRef<typeof Button>;
  contentProps?: Sheet["ContentProps"];
  dialogProps?: Sheet["DialogProps"];
  children?: ReactNode;
}) {
  return (
    <Sheet {...props}>
      <Sheet.Trigger>
        <Button>Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop {...backdropProps}>
        <Sheet.Content {...contentProps}>
          <Sheet.Dialog {...dialogProps}>
            <Sheet.CloseTrigger aria-label="Dismiss sheet" />
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Details</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>{children ?? <p>Sheet content</p>}</Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button {...closeProps}>Done</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const SheetInModalFixture = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Modal>
      <Button>Open modal</Button>
      <Modal.Backdrop>
        <Modal.Container size="full">
          <Modal.Dialog aria-label="Modal">
            <Button onPress={() => setIsSheetOpen(true)}>Open nested sheet</Button>
            <Sheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <Sheet.Backdrop>
                <Sheet.Content>
                  <Sheet.Dialog aria-label="Nested sheet">
                    <Sheet.Body>Sheet content</Sheet.Body>
                  </Sheet.Dialog>
                </Sheet.Content>
              </Sheet.Backdrop>
            </Sheet>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
