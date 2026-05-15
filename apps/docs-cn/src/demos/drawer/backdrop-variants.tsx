import {Button, Drawer} from "@heroui/react";

const VARIANT_LABELS = {
  blur: "模糊",
  opaque: "不透明",
  transparent: "透明",
} as const;

export function BackdropVariants() {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Drawer key={variant}>
          <Button variant="secondary">{VARIANT_LABELS[variant]}</Button>
          <Drawer.Backdrop variant={variant}>
            <Drawer.Content>
              <Drawer.Dialog>
                <Drawer.Handle />
                <Drawer.CloseTrigger />
                <Drawer.Header>
                  <Drawer.Heading>背景：{VARIANT_LABELS[variant]}</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>
                  <p>
                    此抽屉使用 <code>{variant}</code> 背景变体。
                  </p>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button className="w-full" slot="close">
                    关闭
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
