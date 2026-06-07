"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

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
        <Modal key={variant}>
          <Button variant="secondary">{VARIANT_LABELS[variant]}</Button>
          <Modal.Backdrop variant={variant}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <Rocket className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>背景：{VARIANT_LABELS[variant]}</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    {variant === "opaque"
                      ? "不透明背景会完全遮挡背后内容，让用户把注意力集中在模态框上。"
                      : variant === "blur"
                        ? "模糊背景会柔和地虚化背后内容，同时保留一定的环境上下文。"
                        : "透明背景会完整保留背后内容，适合重要性较低的交互场景。"}
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
