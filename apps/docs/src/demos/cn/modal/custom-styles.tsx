"use client";

import {CircleCheck} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function CustomStyles() {
  return (
    <Modal>
      <Button variant="secondary">打开</Button>
      <Modal.Backdrop className="bg-overlay/50 dark:bg-overlay/65" variant="blur">
        <Modal.Container>
          <Modal.Dialog className="relative overflow-hidden border border-border/80 bg-surface/90 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl sm:max-w-[340px] dark:border-border/90 dark:bg-surface/85 dark:ring-white/10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-neutral-500/8 to-transparent dark:from-neutral-400/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-neutral-400/40 to-transparent dark:via-neutral-500/35"
            />
            <Modal.CloseTrigger />
            <Modal.Header className="relative">
              <Modal.Icon className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                <CircleCheck className="size-5" />
              </Modal.Icon>
              <Modal.Heading>更改已保存</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="relative">
              <p className="text-sm text-muted">你的草稿已在各设备间同步。</p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                完成
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
