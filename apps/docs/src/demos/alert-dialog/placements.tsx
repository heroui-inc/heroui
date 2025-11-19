"use client";

import {AlertDialog, Button} from "@heroui/react";

export function Placements() {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <AlertDialog key={placement}>
          <Button variant="secondary">
            {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Button>
          <AlertDialog.Container placement={placement}>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              {({close}) => (
                <>
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent" />
                    <AlertDialog.Heading>
                      {placement === "auto"
                        ? "Auto Placement"
                        : `${placement.charAt(0).toUpperCase() + placement.slice(1)} Position`}
                    </AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p>
                      {placement === "auto"
                        ? "Automatically positions at the bottom on mobile and center on desktop for optimal user experience."
                        : `This dialog is positioned at the ${placement} of the viewport. Critical confirmations are typically centered for maximum attention.`}
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
