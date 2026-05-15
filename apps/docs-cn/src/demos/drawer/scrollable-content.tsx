import {Button, Drawer} from "@heroui/react";

export function ScrollableContent() {
  return (
    <Drawer>
      <Button variant="secondary">条款与条件</Button>
      <Drawer.Backdrop>
        <Drawer.Content>
          <Drawer.Dialog>
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>条款与条件</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {Array.from({length: 20}).map((_, i) => (
                <p key={i} className="mb-3">
                  段落 {i + 1}：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                  risus, sed porttitor quam.
                </p>
              ))}
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                拒绝
              </Button>
              <Button slot="close">接受</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
