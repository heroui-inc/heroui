"use client";

import {AlertDialog, Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomBackdrop() {
  return (
    <AlertDialog>
      <Button variant="danger">Delete Account</Button>
      <AlertDialog.Backdrop
        className="bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
        variant="blur"
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="items-center text-center">
              <AlertDialog.Icon status="danger">
                <Icon className="size-5" icon="gravity-ui:triangle-exclamation" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Permanently delete your account?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This action cannot be undone. All your data, settings, and content will be
                permanently removed from our servers. The dramatic red backdrop emphasizes the
                severity and irreversibility of this decision.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex-col-reverse">
              <Button className="w-full" slot="close">
                Keep Account
              </Button>
              <Button className="w-full" slot="close" variant="danger">
                Delete Forever
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
