"use client";

import {AlertDialog, Button} from "@heroui/react";

export function WithCloseButton() {
  return (
    <AlertDialog>
      <Button variant="secondary">Show Information</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
              <AlertDialog.Heading>Less critical information</AlertDialog.Heading>
              <p className="text-sm leading-relaxed text-muted">
                Close button and backdrop dismiss are enabled
              </p>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                For less critical confirmations, you can enable both the close button and backdrop
                dismissal. This provides users with multiple ways to exit the dialog.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close">Confirm</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
