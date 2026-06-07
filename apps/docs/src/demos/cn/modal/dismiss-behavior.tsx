"use client";

import {CircleInfo} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function DismissBehavior() {
  return (
    <div className="flex max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">isDismissable</h3>
        <p className="text-sm text-muted">
          控制是否允许通过点击遮罩关闭模态框。默认为 <code>true</code>。设为 <code>false</code>{" "}
          时需通过明确操作关闭。
        </p>
        <Modal>
          <Button variant="secondary">打开模态框</Button>
          <Modal.Backdrop isDismissable={false}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <CircleInfo className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>isDismissable = false</Modal.Heading>
                  <p className="text-sm leading-5 text-muted">点击遮罩不会关闭此模态框</p>
                </Modal.Header>
                <Modal.Body>
                  <p>尝试点击遮罩区域——模态框不会关闭，必须使用关闭按钮或按 ESC 键关闭。</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" slot="close">
                    关闭
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
        <p className="text-sm text-muted">
          控制是否允许通过 ESC 关闭模态框。设为 <code>true</code> 时将禁用
          ESC，用户须通过明确操作关闭。
        </p>
        <Modal>
          <Button variant="secondary">打开模态框</Button>
          <Modal.Backdrop isKeyboardDismissDisabled>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-default text-foreground">
                    <CircleInfo className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>isKeyboardDismissDisabled = true</Modal.Heading>
                  <p className="text-sm leading-5 text-muted">已禁用 ESC 键</p>
                </Modal.Header>
                <Modal.Body>
                  <p>按 ESC 无反应。必须使用关闭按钮或点击遮罩才能关闭此模态框。</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" slot="close">
                    关闭
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </div>
  );
}
