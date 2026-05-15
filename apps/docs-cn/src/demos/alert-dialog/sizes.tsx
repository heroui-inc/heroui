"use client";

import {Rocket} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

const SIZE_LABELS = {
  cover: "通栏",
  lg: "大",
  md: "中",
  sm: "小",
  xs: "超小",
} as const;

export function Sizes() {
  const sizes = ["xs", "sm", "md", "lg", "cover"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <AlertDialog key={size}>
          <Button variant="secondary">{SIZE_LABELS[size]}</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container size={size}>
              <AlertDialog.Dialog>
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon className="bg-default text-foreground">
                    <Rocket className="size-5" />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>尺寸：{SIZE_LABELS[size]}</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    {size === "cover" ? (
                      <>
                        此警告框使用 <code>cover</code> 尺寸：在移动端与桌面端保留边距（移动端约
                        16px、桌面端约
                        40px）铺满可视区域，仍保持圆角与标准内边距，适合需要最大宽度又保留对话框气质的关键确认。
                      </>
                    ) : (
                      <>
                        此警告框使用 <code>{size}</code>{" "}
                        尺寸。在移动端各尺寸都会接近全宽以便阅读；在桌面端则对应不同的最大宽度，以适配不同信息量。
                      </>
                    )}
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
