"use client";

import {AlertDialog, Button} from "@heroui/react";

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
        <AlertDialog key={placement}>
          <Button variant="secondary">{PLACEMENT_LABELS[placement]}</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container placement={placement}>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent" />
                  <AlertDialog.Heading>
                    {placement === "auto" ? "自动定位" : `${PLACEMENT_LABELS[placement]}位置`}
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    {placement === "auto"
                      ? "在移动端默认靠近底部，在桌面端居中，以获得更合适的阅读与操作体验。"
                      : `对话框将锚定在视口的「${PLACEMENT_LABELS[placement]}」区域。重要确认通常使用居中 placement 以吸引最多注意。`}
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    取消
                  </Button>
                  <Button slot="close">确认</Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      ))}
    </div>
  );
}
