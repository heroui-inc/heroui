import {Button, Drawer} from "@heroui/react";

const PLACEMENT_LABELS = {
  bottom: "底部",
  left: "左侧",
  right: "右侧",
  top: "顶部",
} as const;

export function Placements() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Drawer key={placement}>
          <Button variant="secondary">{PLACEMENT_LABELS[placement]}</Button>
          <Drawer.Backdrop>
            <Drawer.Content placement={placement}>
              <Drawer.Dialog>
                <Drawer.CloseTrigger />
                {placement === "bottom" && <Drawer.Handle />}
                <Drawer.Header>
                  <Drawer.Heading>{PLACEMENT_LABELS[placement]}抽屉</Drawer.Heading>
                </Drawer.Header>
                <Drawer.Body>
                  <p>
                    此抽屉从屏幕<strong>{PLACEMENT_LABELS[placement]}</strong>边缘滑入。
                  </p>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button slot="close" variant="secondary">
                    取消
                  </Button>
                  <Button slot="close">完成</Button>
                </Drawer.Footer>
                {placement === "top" && <Drawer.Handle />}
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      ))}
    </div>
  );
}
