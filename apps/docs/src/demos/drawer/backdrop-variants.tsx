import {Button, Drawer} from "@heroui/react";

export function BackdropVariants() {
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
}
