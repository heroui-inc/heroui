"use client";

import {CircleCheck} from "@gravity-ui/icons";
import {Button, Modal, useOverlayState} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [isOpen, setIsOpen] = React.useState(false);

  const state = useOverlayState();

  return (
    <div className="flex max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">配合 React.useState()</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          使用 React 的 <code className="text-foreground">useState</code>{" "}
          管理模态框开关，适合简单场景。
        </p>
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-surface p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-xs text-muted">
              状态：{" "}
              <span className="font-mono font-medium text-foreground">
                {isOpen ? "打开" : "关闭"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
              打开模态框
            </Button>
            <Button size="sm" variant="tertiary" onPress={() => setIsOpen(!isOpen)}>
              切换
            </Button>
          </div>
        </div>

        <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <CircleCheck className="size-5" />
                </Modal.Icon>
                <Modal.Heading>由 useState() 控制</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  该模态框由 React 的 <code>useState</code> 控制。将 <code>isOpen</code> 与{" "}
                  <code>onOpenChange</code> 传入即可在外部管理状态。
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  取消
                </Button>
                <Button slot="close">确认</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">配合 useOverlayState()</h3>
        <p className="text-sm leading-relaxed text-pretty text-muted">
          使用 <code className="text-foreground">useOverlayState</code> 获得更简洁的 API，内置{" "}
          <code>open()</code>、<code>close()</code>、<code>toggle()</code> 等方法。
        </p>
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-surface p-4 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <p className="text-xs text-muted">
              状态：{" "}
              <span className="font-mono font-medium text-foreground">
                {state.isOpen ? "打开" : "关闭"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onPress={state.open}>
              打开模态框
            </Button>
            <Button size="sm" variant="tertiary" onPress={state.toggle}>
              切换
            </Button>
          </div>
        </div>

        <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen}>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-success-soft text-success-soft-foreground">
                  <CircleCheck className="size-5" />
                </Modal.Icon>
                <Modal.Heading>由 useOverlayState() 控制</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <code>useOverlayState</code> 为常见操作提供专用方法，无需手写回调，直接使用{" "}
                  <code>state.open()</code>、<code>state.close()</code> 或{" "}
                  <code>state.toggle()</code> 即可。
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  取消
                </Button>
                <Button slot="close">确认</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </div>
    </div>
  );
}
