import {Button, Drawer} from "@heroui/react";

export function CustomStyles() {
  return (
    <Drawer>
      <Button variant="secondary">Open Drawer</Button>
      <Drawer.Backdrop className="bg-overlay/50 dark:bg-overlay/65" variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="relative overflow-hidden border-l border-border/80 bg-surface/90 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl dark:border-border/90 dark:bg-surface/85 dark:ring-white/10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-neutral-500/8 to-transparent dark:from-neutral-400/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-neutral-400/40 to-transparent dark:via-neutral-500/35"
            />
            <Drawer.CloseTrigger />
            <Drawer.Header className="relative">
              <Drawer.Heading className="font-semibold tracking-tight text-foreground">
                Drawer Title
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="relative">
              <p className="text-sm leading-relaxed text-muted">
                This drawer slides in from the right. Customize the backdrop, panel, header, body,
                and footer with Tailwind classes on each part.
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
