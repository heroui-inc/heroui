import {Button} from "@/components/button";
import {Drawer} from "@/components/drawer";

export type DrawerFixtureProps = {
  defaultOpen?: boolean;
  isOpen?: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "top" | "bottom" | "left" | "right";
};

export const DrawerFixture = (props: DrawerFixtureProps = {}) => (
  <Drawer defaultOpen={props.defaultOpen} isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
    <Button>Open Drawer</Button>
    <Drawer.Backdrop
      isDismissable={props.isDismissable}
      isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
    >
      <Drawer.Content placement={props.placement}>
        <Drawer.Dialog>
          <Drawer.Handle />
          <Drawer.CloseTrigger />
          <Drawer.Header>
            <Drawer.Heading>Drawer Title</Drawer.Heading>
          </Drawer.Header>
          <Drawer.Body>
            <p>Drawer body content</p>
            <Button>Inside action</Button>
          </Drawer.Body>
          <Drawer.Footer>
            <Button slot="close">Confirm</Button>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  </Drawer>
);
