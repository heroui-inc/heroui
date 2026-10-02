"use client";

import {Sparkles} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function CustomBackdrop() {
  return (
    <Modal>
      <Button variant="secondary">自定义背景</Button>
      <Modal.Backdrop
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
        variant="blur"
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.Header className="items-center text-center">
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Sparkles className="size-5" />
              </Modal.Icon>
              <Modal.Heading>高级背景</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                此背景采用从底部深色过渡到顶部完全透明的精致渐变，并配合柔和的模糊效果。渐变会在浅色与深色模式下自动调整强度，以获得最佳对比度。
              </p>
            </Modal.Body>
            <Modal.Footer className="flex-col-reverse">
              <Button className="w-full" slot="close">
                Amazing!
              </Button>
              <Button className="w-full" slot="close" variant="secondary">
                关闭
              </Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
