"use client";

import {AlertDialog, Button} from "@heroui/react";

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
        <AlertDialog key={variant}>
          <Button variant="secondary">{VARIANT_LABELS[variant]}</Button>
          <AlertDialog.Backdrop variant={variant}>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent" />
                  <AlertDialog.Heading>背景：{VARIANT_LABELS[variant]}</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    {variant === "opaque"
                      ? "不透明的深色背景会完全遮挡背后内容，让用户把注意力集中在对话框上。"
                      : variant === "blur"
                        ? "模糊背景会柔和地虚化背后内容，同时保留一定的环境上下文。"
                        : "透明背景会完整保留背后内容，适合重要性较低的确认场景。"}
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
