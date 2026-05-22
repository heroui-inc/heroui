"use client";

import {CircleInfo} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

export function DismissBehavior() {
  return (
    <div className="flex max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">isDismissable</h3>
        <p className="text-sm text-muted">
          控制是否允许通过点击遮罩关闭对话框。警告框通常需要明确操作，因此默认为 <code>false</code>
          。对重要性较低的确认，可设为 <code>true</code>。
        </p>
        <AlertDialog>
          <Button variant="secondary">打开警告对话框</Button>
          <AlertDialog.Backdrop isDismissable={false}>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger">
                    <CircleInfo className="size-5" />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>isDismissable = false</AlertDialog.Heading>
                  <p className="text-sm leading-5 text-muted">点击遮罩不会关闭此对话框</p>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>尝试点击遮罩区域——对话框不会关闭，必须通过底部操作按钮关闭。</p>
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
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">isKeyboardDismissDisabled</h3>
        <p className="text-sm text-muted">
          控制是否允许通过 ESC 关闭。警告框通常需要明确操作，因此默认为 <code>true</code>（禁用
          ESC）。设为 <code>false</code> 时将允许 ESC 关闭。
        </p>
        <AlertDialog>
          <Button variant="secondary">打开警告对话框</Button>
          <AlertDialog.Backdrop isKeyboardDismissDisabled>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent">
                    <CircleInfo className="size-5" />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>isKeyboardDismissDisabled = true</AlertDialog.Heading>
                  <p className="text-sm leading-5 text-muted">已禁用 ESC 关闭</p>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>按下 ESC 不会有任何反应，必须通过操作按钮关闭此对话框。</p>
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
      </div>
    </div>
  );
}
