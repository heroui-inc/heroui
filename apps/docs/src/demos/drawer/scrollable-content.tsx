import {Button, Drawer} from "@heroui/react";

export function ScrollableContent() {
  return (
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
                  pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                  risus, sed porttitor quam.
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
}
