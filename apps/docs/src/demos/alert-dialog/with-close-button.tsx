"use client";

import {AlertDialog, Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithCloseButton() {
  return (
    <AlertDialog>
      <Button variant="secondary">Show Information</Button>
      <AlertDialog.Container isDismissable>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          {({close}) => (
            <>
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="default">
                  <Icon className="size-5" icon="gravity-ui:circle-info" />
                </AlertDialog.Icon>
                <AlertDialog.Heading>Less critical information</AlertDialog.Heading>
                <p className="text-muted text-sm leading-relaxed">
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
                <Button variant="tertiary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Confirm</Button>
              </AlertDialog.Footer>
            </>
          )}
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog>
  );
}
