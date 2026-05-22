import {Button, Drawer} from "@heroui/react";

export function NonDismissable() {
  return (
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
                This drawer cannot be dismissed by clicking outside or dragging. You must use one of
                the buttons below.
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
}
