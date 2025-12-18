"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Sizes() {
  const sizes = ["xs", "sm", "md", "lg", "cover", "full"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <Modal key={size}>
          <Button variant="secondary">{size.charAt(0).toUpperCase() + size.slice(1)}</Button>
          <Modal.Backdrop>
            <Modal.Container size={size}>
              <Modal.Dialog>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Icon className="size-5" icon="gravity-ui:rocket" />
                  </Modal.Icon>
                  <Modal.Heading>
                    Size: {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    {size === "cover" ? (
                      <>
                        This modal uses the <code>cover</code> size variant. It spans the full
                        screen with margins: 16px on mobile and 40px on desktop. Maintains rounded
                        corners and standard padding. Perfect for cover-style content that needs
                        maximum width while preserving modal aesthetics.
                      </>
                    ) : size === "full" ? (
                      <>
                        This modal uses the <code>full</code> size variant. It occupies the entire
                        viewport without any margins, rounded corners, or shadows, creating a true
                        fullscreen experience. Ideal for immersive content or full-page
                        interactions.
                      </>
                    ) : (
                      <>
                        This modal uses the <code>{size}</code> size variant. On mobile devices, all
                        sizes adapt to near full-width for optimal viewing. On desktop, each size
                        provides a different maximum width to suit various content needs.
                      </>
                    )}
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
      ))}
    </div>
  );
}
