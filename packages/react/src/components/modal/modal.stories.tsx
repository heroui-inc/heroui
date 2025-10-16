import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";
import {ModalOverlay} from "react-aria-components";

import {Button} from "../button";
import {CloseButton} from "../close-button";

import Modal from "./modal";

export default {
  argTypes: {
    // isDisabled: {
    //   control: "boolean",
    // },
    // size: {
    //   control: "select",
    //   options: ["sm", "md", "lg"],
    // },
    // variant: {
    //   control: "select",
    //   options: ["primary", "secondary", "tertiary", "ghost", "danger"],
    // },
  },
  component: Modal,
  title: "Components/Overlays/Modal",
} as Meta<typeof Modal>;

export const Default = () => {
  return (
    <>
      <Modal>
        <Button>Open Modal</Button>
        <Modal.Overlay>
          <Modal.Content>
            <Modal.Dialog>
              {({close}) => (
                <>
                  <div>
                    123
                    <Button onPress={() => close()}>Close</Button>
                  </div>
                  <Modal.CloseTrigger />
                </>
              )}
            </Modal.Dialog>
          </Modal.Content>
        </Modal.Overlay>
      </Modal>

      <Modal>
        <Button>Open Modal</Button>
        <ModalOverlay>
          <Modal.Content>
            <Modal.Dialog>
              {({close}) => (
                <>
                  <div>
                    123
                    <Button onPress={() => close()}>Close</Button>
                  </div>
                  <Modal.CloseTrigger />
                </>
              )}
            </Modal.Dialog>
          </Modal.Content>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export const WithIcon = () => (
  <Modal>
    <Button>Open with Icon</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Icon>
              <Icon className="size-5" icon="gravity-ui:circle-info" />
            </Modal.Icon>
            <Modal.Title>Information</Modal.Title>
            <Modal.Description>Here's some important information for you</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p>
              This modal includes an icon to draw attention. Icons help users quickly understand the
              purpose of the modal.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button>Got it</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const CenterAligned = () => (
  <Modal placement="center">
    <Button>Open Centered</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          {({close}) => (
            <>
              <Modal.Header align="center">
                <Modal.Icon>
                  <Icon className="size-5" icon="gravity-ui:circle-check" />
                </Modal.Icon>
                <Modal.Title>Success!</Modal.Title>
                <Modal.Description>Your action completed successfully</Modal.Description>
              </Modal.Header>
              <Modal.Footer layout="vertical">
                <Button onPress={close}>Continue</Button>
                <Button variant="secondary" onPress={close}>
                  Close
                </Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </>
          )}
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const WithCloseButton = () => (
  <Modal>
    <Button>Open with CloseButton</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Custom Close Button</Modal.Title>
            <Modal.Description>
              This example uses asChild to compose with the CloseButton component
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p>
              The close trigger uses <code>asChild</code> to render a custom CloseButton component
              instead of the default close icon.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </Modal.Footer>
          <Modal.CloseTrigger asChild>
            <CloseButton />
          </Modal.CloseTrigger>
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const Sizes = () => (
  <div className="flex flex-wrap gap-4">
    <Modal size="sm">
      <Button size="sm">Small Modal</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Small Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This is a small modal.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
              <Button size="sm">OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal size="md">
      <Button>Medium Modal (Default)</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Medium Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This is a medium modal (default size).</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal size="lg">
      <Button size="lg">Large Modal</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Large Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This is a large modal with more space for content.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  </div>
);

export const Placements = () => (
  <div className="flex flex-wrap gap-4">
    <Modal placement="top">
      <Button>Top Placement</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Top Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This modal appears at the top of the screen.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal placement="center">
      <Button>Center Placement (Default)</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Center Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This modal is centered on the screen (default).</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal placement="bottom">
      <Button>Bottom Placement</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Bottom Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This modal appears at the bottom of the screen.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  </div>
);

export const BackdropVariants = () => (
  <div className="flex flex-wrap gap-4">
    <Modal backdrop="opaque">
      <Button>Opaque Backdrop (Default)</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Opaque Backdrop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This modal has an opaque backdrop.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal backdrop="blur">
      <Button>Blur Backdrop</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Blur Backdrop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This modal has a blurred backdrop.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal backdrop="transparent">
      <Button>Transparent Backdrop</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Transparent Backdrop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>This modal has a transparent backdrop.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  </div>
);

export const CustomBackdrop = () => (
  <Modal backdrop="transparent">
    <Button>Custom Backdrop</Button>
    <Modal.Overlay className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md">
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header align="center">
            <Modal.Icon>
              <Icon className="size-5" icon="gravity-ui:sparkles" />
            </Modal.Icon>
            <Modal.Title>Custom Backdrop</Modal.Title>
            <Modal.Description>This modal has a custom gradient backdrop</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p>You can fully customize the backdrop with any Tailwind classes or custom styles.</p>
          </Modal.Body>
          <Modal.Footer layout="vertical">
            <Button>Amazing!</Button>
            <Button variant="secondary">Close</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const VerticalFooter = () => (
  <Modal>
    <Button>Vertical Footer</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Vertical Footer Layout</Modal.Title>
            <Modal.Description>Actions are stacked vertically</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p>The footer buttons are arranged in a vertical layout, useful for mobile designs.</p>
          </Modal.Body>
          <Modal.Footer layout="vertical">
            <Button>Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const ConfirmDialog = () => (
  <Modal size="sm">
    <Button variant="danger">Delete Item</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          {({close}) => (
            <>
              <Modal.Header align="center">
                <Modal.Icon>
                  <Icon className="text-danger size-5" icon="gravity-ui:triangle-exclamation" />
                </Modal.Icon>
                <Modal.Title>Confirm Delete</Modal.Title>
                <Modal.Description>This action cannot be undone</Modal.Description>
              </Modal.Header>
              <Modal.Body>
                <p className="text-center text-sm">
                  Are you sure you want to delete this item? All associated data will be permanently
                  removed.
                </p>
              </Modal.Body>
              <Modal.Footer layout="vertical">
                <Button
                  variant="danger"
                  onPress={() => {
                    // Perform delete action
                    close();
                  }}
                >
                  Delete
                </Button>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </>
          )}
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const CustomTrigger = () => (
  <Modal>
    <Modal.Trigger>
      <div className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50">
        <Icon className="text-primary size-6" icon="gravity-ui:gear" />
        <div>
          <p className="font-medium">Settings</p>
          <p className="text-muted text-sm">Click to open settings</p>
        </div>
      </div>
    </Modal.Trigger>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          {({close}) => (
            <>
              <Modal.Header>
                <Modal.Icon>
                  <Icon className="size-5" icon="gravity-ui:gear" />
                </Modal.Icon>
                <Modal.Title>Settings</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Using Modal.Trigger allows you to create custom trigger elements.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onPress={close}>
                  Cancel
                </Button>
                <Button onPress={close}>Save</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </>
          )}
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const ControlledModal = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Button onPress={() => setOpen(true)}>Open Modal</Button>
        <Button variant="secondary" onPress={() => setOpen(false)}>
          Close Modal (External)
        </Button>
      </div>
      <p className="text-muted text-sm">Modal is {isOpen ? "open" : "closed"}</p>
      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Modal.Overlay>
          <Modal.Content>
            <Modal.Dialog>
              {({close}) => (
                <>
                  <Modal.Header>
                    <Modal.Title>Controlled Modal</Modal.Title>
                    <Modal.Description>
                      This modal's state is controlled externally with useState
                    </Modal.Description>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      You can control the modal state programmatically using isOpen and onOpenChange
                      props.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onPress={close}>
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        close();
                      }}
                    >
                      Confirm
                    </Button>
                  </Modal.Footer>
                  <Modal.CloseTrigger />
                </>
              )}
            </Modal.Dialog>
          </Modal.Content>
        </Modal.Overlay>
      </Modal>
    </div>
  );
};

export const ScrollBehaviorNormal = () => (
  <Modal scrollBehavior="normal">
    <Button>Normal (Short Content)</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Normal Scroll Behavior</Modal.Title>
            <Modal.Description>Modal doesn't scroll - suitable for short content</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p>This is a short content example that doesn't require scrolling.</p>
            <p>The modal will simply display all content without any scroll behavior.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const ScrollBehaviorInside = () => (
  <Modal scrollBehavior="inside">
    <Button>Inside (Long Content)</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Inside Scroll Behavior</Modal.Title>
            <Modal.Description>
              Modal body scrolls internally while modal stays fixed
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>
            {Array.from({length: 20}).map((_, i) => (
              <p key={i} className="mb-3">
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus,
                sed porttitor quam.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const ScrollBehaviorOutside = () => (
  <Modal scrollBehavior="outside">
    <Button>Outside (Very Long Content)</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Outside Scroll Behavior</Modal.Title>
            <Modal.Description>Entire modal scrolls with the page</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            {Array.from({length: 50}).map((_, i) => (
              <p key={i} className="mb-3">
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus,
                sed porttitor quam. Aenean lacinia bibendum nulla sed consectetur.
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const ScrollBehaviorComparison = () => {
  const [scrollBehavior, setScrollBehavior] = useState<"normal" | "inside" | "outside">("inside");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            checked={scrollBehavior === "normal"}
            name="scrollBehavior"
            type="radio"
            value="normal"
            onChange={(e) => setScrollBehavior(e.target.value as "normal" | "inside" | "outside")}
          />
          Normal
        </label>
        <label className="flex items-center gap-2">
          <input
            checked={scrollBehavior === "inside"}
            name="scrollBehavior"
            type="radio"
            value="inside"
            onChange={(e) => setScrollBehavior(e.target.value as "normal" | "inside" | "outside")}
          />
          Inside
        </label>
        <label className="flex items-center gap-2">
          <input
            checked={scrollBehavior === "outside"}
            name="scrollBehavior"
            type="radio"
            value="outside"
            onChange={(e) => setScrollBehavior(e.target.value as "normal" | "inside" | "outside")}
          />
          Outside
        </label>
      </div>

      <Modal scrollBehavior={scrollBehavior}>
        <Button>
          Open Modal ({scrollBehavior.charAt(0).toUpperCase() + scrollBehavior.slice(1)})
        </Button>
        <Modal.Overlay>
          <Modal.Content>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>
                  Scroll Behavior:{" "}
                  {scrollBehavior.charAt(0).toUpperCase() + scrollBehavior.slice(1)}
                </Modal.Title>
                <Modal.Description>
                  Toggle the radio buttons above to see different scroll behaviors
                </Modal.Description>
              </Modal.Header>
              <Modal.Body>
                {Array.from({length: 30}).map((_, i) => (
                  <p key={i} className="mb-3">
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                  </p>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary">Cancel</Button>
                <Button>Confirm</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Content>
        </Modal.Overlay>
      </Modal>
    </div>
  );
};

export const PlacementAuto = () => (
  <Modal placement="auto">
    <Button>Open Auto Placement Modal</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Responsive Modal</Modal.Title>
            <Modal.Description>
              On mobile: Bottom sheet that slides up from the bottom.
              <br />
              On desktop: Centered modal with zoom animation.
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-3">
              This modal uses <code>placement="auto"</code> for an adaptive experience:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Mobile (&lt; 640px):</strong> Appears as a bottom sheet with rounded top
                corners and smooth slide-up animation (like iOS/Android native sheets)
              </li>
              <li>
                <strong>Desktop (≥ 640px):</strong> Appears centered with a subtle zoom animation
              </li>
            </ul>
            <p className="mt-4">
              The drag indicator at the top is only visible on mobile devices, providing a visual
              cue for the bottom sheet interaction pattern.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);

export const AllPlacements = () => (
  <div className="flex flex-wrap gap-4">
    <Modal placement="auto">
      <Button>Auto (Responsive)</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Auto Placement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Mobile: Bottom sheet. Desktop: Centered.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal placement="center">
      <Button>Center (Default)</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Center Placement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Always centered on all screen sizes.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal placement="top">
      <Button>Top</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Top Placement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Positioned at the top of the screen.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>

    <Modal placement="bottom">
      <Button>Bottom</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Bottom Placement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Positioned at the bottom of the screen.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button>OK</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  </div>
);

export const MobileBottomSheet = () => (
  <Modal placement="auto" scrollBehavior="inside">
    <Button>Open Bottom Sheet</Button>
    <Modal.Overlay>
      <Modal.Content>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Mobile-First Design</Modal.Title>
            <Modal.Description>
              Resize your browser to see the mobile bottom sheet experience
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <p>
                This modal demonstrates the iOS/Android-style bottom sheet pattern that provides a
                native-like mobile experience.
              </p>
              <div className="bg-accent-soft rounded-lg p-4">
                <h4 className="mb-2 font-medium">Mobile Features (&lt; 640px):</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm">
                  <li>Slides up from bottom with smooth animation</li>
                  <li>Rounded top corners, flush bottom</li>
                  <li>Visible drag indicator bar</li>
                  <li>300ms animation with iOS-like easing</li>
                </ul>
              </div>
              <div className="bg-accent-soft rounded-lg p-4">
                <h4 className="mb-2 font-medium">Desktop Features (≥ 640px):</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm">
                  <li>Centered with zoom animation</li>
                  <li>All corners rounded</li>
                  <li>Drag indicator hidden</li>
                  <li>200ms animation with standard easing</li>
                </ul>
              </div>
              {Array.from({length: 10}).map((_, i) => (
                <p key={i}>
                  Additional content paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
                </p>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer layout="vertical">
            <Button>Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
          </Modal.Footer>
          <Modal.CloseTrigger />
        </Modal.Dialog>
      </Modal.Content>
    </Modal.Overlay>
  </Modal>
);
