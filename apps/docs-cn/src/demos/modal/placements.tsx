"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

const PLACEMENT_LABELS = {
  auto: "自动",
  bottom: "底部",
  center: "居中",
  top: "顶部",
} as const;

export function Placements() {
  const placements = ["auto", "top", "center", "bottom"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Modal key={placement}>
          <Button variant="secondary">{PLACEMENT_LABELS[placement]}</Button>
          <Modal.Backdrop>
            <Modal.Container placement={placement}>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Rocket className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>
                    {placement === "auto" ? "自动定位" : `${PLACEMENT_LABELS[placement]}位置`}
                  </Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    {placement === "auto"
                      ? "在移动端默认靠近底部，在桌面端居中，以获得更合适的阅读与操作体验。"
                      : `模态框将锚定在视口的「${PLACEMENT_LABELS[placement]}」区域。可尝试不同 placement 查看屏幕上的定位效果。`}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" slot="close">
                    继续
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}
