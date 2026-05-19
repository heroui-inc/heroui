import {Button, Drawer} from "@heroui/react";

export function CustomStyles() {
  return (
    <Drawer>
      <Button variant="secondary">Filters</Button>
      <Drawer.Backdrop className="bg-black/40 backdrop-blur-sm dark:bg-black/60">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="border-l border-border/80 bg-surface/95 shadow-2xl backdrop-blur-md dark:bg-neutral-950/90">
            <Drawer.Header>
              <Drawer.Heading className="font-semibold tracking-tight text-foreground">
                Filters
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p className="text-sm leading-relaxed text-muted">
                Narrow results by status, assignee, or date range.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                Reset
              </Button>
              <Button slot="close">Apply</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
