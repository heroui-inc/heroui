"use client";

import {AlertDialog, Button, Kbd} from "@heroui/react";
import {Icon} from "@iconify/react";

export function DismissBehavior() {
  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">Dismiss Behavior</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Alert dialogs require explicit user action by design—users must click an action button to
          close the dialog. By default, backdrop clicks and ESC key are both disabled to prevent
          accidental dismissal of critical confirmations.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">Default (Requires Action)</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          With default settings, users cannot close the dialog by clicking outside or pressing ESC.
          They must choose an action button.
        </p>
        <AlertDialog>
          <Button variant="danger">Delete Project</Button>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="danger">
                      <Icon className="size-5" icon="gravity-ui:triangle-exclamation" />
                    </AlertDialog.Icon>
                    <AlertDialog.Heading>Delete this project?</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      This will permanently delete <strong>Marketing Campaign 2024</strong> and all
                      its files. This action cannot be undone.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      Cancel
                    </Button>
                    <Button variant="danger" onPress={close}>
                      Delete Project
                    </Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">Allow Backdrop Clicks</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Set <code className="text-foreground">isDismissable=true</code> to let users click outside
          the dialog to close it. Useful for less critical confirmations.
        </p>
        <AlertDialog>
          <Button variant="secondary">Update Available</Button>
          <AlertDialog.Container isDismissable>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="success">
                      <Icon className="size-5" icon="gravity-ui:arrow-up-from-line" />
                    </AlertDialog.Icon>
                    <AlertDialog.Heading>Update available</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      Version 2.4.0 is now available. This update includes performance improvements
                      and bug fixes.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button variant="tertiary" onPress={close}>
                      Later
                    </Button>
                    <Button onPress={close}>Update Now</Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">Full Flexibility</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          Enable both <code className="text-foreground">isDismissable=true</code> and{" "}
          <code className="text-foreground">isKeyboardDismissDisabled=false</code> for maximum
          flexibility. Users can close via backdrop,{" "}
          <Kbd>
            <Kbd.Content>Esc</Kbd.Content>
          </Kbd>
          , or button.
        </p>
        <AlertDialog>
          <Button variant="secondary">Show Tips</Button>
          <AlertDialog.Container isDismissable isKeyboardDismissDisabled={false}>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent">
                      <Icon className="size-5" icon="gravity-ui:circle-info" />
                    </AlertDialog.Icon>
                    <AlertDialog.Heading>Pro tip</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      Use keyboard shortcuts to work faster. Press{" "}
                      <Kbd>
                        <Kbd.Content>Esc</Kbd.Content>
                      </Kbd>{" "}
                      to close this alert dialog.
                    </p>
                  </AlertDialog.Body>
                  <AlertDialog.Footer>
                    <Button className="w-full" onPress={close}>
                      Got it
                    </Button>
                  </AlertDialog.Footer>
                </>
              )}
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      </div>
    </div>
  );
}
