"use client";

import {AlertDialog, Button} from "@heroui/react";

export function BackdropVariants() {
  const variants = [
    {name: "solid", value: "solid"},
    {name: "blur", value: "blur"},
    {name: "transparent", value: "transparent"},
  ] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map(({name, value}) => (
        <AlertDialog key={value}>
          <Button variant="secondary">{name.charAt(0).toUpperCase() + name.slice(1)}</Button>
          <AlertDialog.Container backdropVariant={value}>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent" />
                    <AlertDialog.Heading>
                      {name === "solid"
                        ? "Solid Backdrop"
                        : name === "blur"
                          ? "Blur Backdrop"
                          : "Transparent Backdrop"}
                    </AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      {name === "solid"
                        ? "A solid dark backdrop that completely obscures the background, providing maximum focus on the dialog."
                        : name === "blur"
                          ? "A blurred backdrop that softly obscures the background while maintaining visual context."
                          : "A transparent backdrop that keeps the background fully visible, useful for less critical confirmations."}
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
      ))}
    </div>
  );
}
