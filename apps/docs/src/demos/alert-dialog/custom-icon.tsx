"use client";

import {LockOpen} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

export function CustomIcon() {
  return (
    <AlertDialog>
      <Button variant="secondary">Reset Password</Button>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          {({close}) => (
            <>
              <AlertDialog.Header>
                <AlertDialog.Icon status="warning">
                  <LockOpen className="size-5" />
                </AlertDialog.Icon>
                <AlertDialog.Heading>Reset your password?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  We'll send a password reset link to your email address. You'll need to create a
                  new password to regain access to your account.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button variant="tertiary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Send Reset Link</Button>
              </AlertDialog.Footer>
            </>
          )}
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog>
  );
}
