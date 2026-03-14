import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Input} from "../input";
import {Label} from "../label";
import {TextField} from "../textfield";

import {Drawer} from "./index";

export default {
  argTypes: {},
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  title: "Components/Overlays/Drawer",
} as Meta<typeof Drawer>;

export const Default = () => {
  return (
    <Drawer>
      <Button variant="secondary">Open Drawer</Button>
      <Drawer.Backdrop>
        <Drawer.Content>
          <Drawer.Dialog>
            <Drawer.Handle />
            <Drawer.Header>
              <Drawer.Heading>Drawer Title</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                This is a bottom drawer built with React Aria's Modal component. It slides up from
                the bottom of the screen with a smooth CSS transition.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Confirm</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
};

export const Placements = () => {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Drawer key={placement}>
          <Button variant="secondary">
            {placement.charAt(0).toUpperCase() + placement.slice(1)}
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement={placement}>
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                {placement === "bottom" && <Drawer.Handle />}
                <Drawer.Header>
                  <Drawer.Heading>
                    {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
                  </Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>
                  <p>
                    This drawer slides in from the <strong>{placement}</strong> edge of the screen.
                  </p>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button slot="close" variant="secondary">
                    Cancel
                  </Button>
                  <Button slot="close">Done</Button>
                </Drawer.Footer>
                {placement === "top" && <Drawer.Handle />}
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      ))}
    </div>
  );
};

export const BackdropVariants = () => {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Drawer key={variant}>
          <Button variant="secondary">{variant.charAt(0).toUpperCase() + variant.slice(1)}</Button>
          <Drawer.Backdrop variant={variant}>
            <Drawer.Content>
              <Drawer.Dialog>
                <Drawer.Handle />
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading>
                    Backdrop: {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>
                  <p>
                    This drawer uses the <code>{variant}</code> backdrop variant.
                  </p>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button className="w-full" slot="close">
                    Close
                  </Button>
                </Drawer.Footer>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      ))}
    </div>
  );
};

export const WithForm = () => (
  <Drawer>
    <Button variant="secondary">Edit Profile</Button>
    <Drawer.Backdrop>
      <Drawer.Content placement="right">
        <Drawer.Dialog>
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Drawer.Heading>Edit Profile</Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body>
            <form className="flex flex-col gap-4">
              <TextField className="w-full" name="name" type="text">
                <Label>Name</Label>
                <Input placeholder="Enter your name" variant="secondary" />
              </TextField>
              <TextField className="w-full" name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="Enter your email" variant="secondary" />
              </TextField>
              <TextField className="w-full" name="bio">
                <Label>Bio</Label>
                <Input placeholder="Tell us about yourself" variant="secondary" />
              </TextField>
            </form>
          </Drawer.Body>
          <Drawer.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button slot="close">Save Changes</Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  </Drawer>
);

export const WithScrollableContent = () => (
  <Drawer>
    <Button variant="secondary">Terms & Conditions</Button>
    <Drawer.Backdrop>
      <Drawer.Content>
        <Drawer.Dialog>
          <Drawer.Handle />
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Drawer.Heading>Terms & Conditions</Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body>
            {Array.from({length: 20}).map((_, i) => (
              <p key={i} className="mb-3">
                Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus,
                sed porttitor quam.
              </p>
            ))}
          </Drawer.Body>
          <Drawer.Footer>
            <Button slot="close" variant="secondary">
              Decline
            </Button>
            <Button slot="close">Accept</Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  </Drawer>
);

export const NavigationDrawer = () => {
  const navItems = [
    {icon: "gravity-ui:house", label: "Home"},
    {icon: "gravity-ui:magnifier", label: "Search"},
    {icon: "gravity-ui:bell", label: "Notifications"},
    {icon: "gravity-ui:envelope", label: "Messages"},
    {icon: "gravity-ui:person", label: "Profile"},
    {icon: "gravity-ui:gear", label: "Settings"},
  ];

  return (
    <Drawer>
      <Button variant="secondary">
        <Icon icon="gravity-ui:bars" />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <Icon className="size-5 text-muted" icon={item.icon} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
};

export const NonDismissable = () => (
  <Drawer>
    <Button variant="secondary">Important Action</Button>
    <Drawer.Backdrop isDismissable={false}>
      <Drawer.Content>
        <Drawer.Dialog>
          <Drawer.Header>
            <Drawer.Heading>Confirm Action</Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body>
            <p>
              This drawer cannot be dismissed by clicking outside. You must use one of the buttons
              below.
            </p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button slot="close">Confirm</Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  </Drawer>
);

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button variant="secondary" onPress={() => setIsOpen(true)}>
          Open Drawer
        </Button>
        <p className="text-sm text-muted">
          Status:{" "}
          <span className="font-mono font-medium text-foreground">
            {isOpen ? "open" : "closed"}
          </span>
        </p>
      </div>

      <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Controlled Drawer</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p>This drawer is controlled externally via React state.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                Close
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </div>
  );
};
