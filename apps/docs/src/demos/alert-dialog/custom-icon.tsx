"use client";

import {AlertDialog, Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomIcon() {
  return (
    <AlertDialog>
      <Button variant="secondary">Reset Password</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="warning">
                <Icon className="size-5" icon="gravity-ui:lock-open" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Reset your password?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                We'll send a password reset link to your email address. You'll need to create a new
                password to regain access to your account.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close">Send Reset Link</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
