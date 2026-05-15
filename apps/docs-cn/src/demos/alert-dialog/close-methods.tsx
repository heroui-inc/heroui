"use client";

import {AlertDialog, Button} from "@heroui/react";

export function CloseMethods() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">
          使用 <code className="text-sm">slot=&quot;close&quot;</code>
        </h3>
        <p className="text-sm text-muted">
          最简单的关闭方式：在对话框内的任意 <code>Button</code> 上添加{" "}
          <code>slot=&quot;close&quot;</code>，点击后会自动关闭对话框。
        </p>
        <AlertDialog>
          <Button variant="secondary">打开对话框</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                <AlertDialog.Header>
                  <AlertDialog.Icon status="accent" />
                  <AlertDialog.Heading>
                    使用 <code className="text-sm">slot=&quot;close&quot;</code>
                  </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p>
                    点击下方任一按钮——它们都带有 <code>slot=&quot;close&quot;</code>
                    ，点击后会自动关闭对话框。
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
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">使用 Dialog 的 render props</h3>
        <p className="text-sm text-muted">
          通过 Dialog 的 render props 获取 <code>close</code>{" "}
          方法，从而完全控制关闭时机与方式，便于在关闭前加入校验等自定义逻辑。
        </p>
        <AlertDialog>
          <Button variant="secondary">打开对话框</Button>
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px]">
                {(renderProps) => (
                  <>
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="success" />
                      <AlertDialog.Heading>使用 Dialog render props</AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p>
                        下方按钮使用 render props 提供的 <code>close</code> 方法。你可以在调用{" "}
                        <code>renderProps.close()</code> 之前加入校验或其他逻辑。
                      </p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button variant="tertiary" onPress={() => renderProps.close()}>
                        取消
                      </Button>
                      <Button onPress={() => renderProps.close()}>确认</Button>
                    </AlertDialog.Footer>
                  </>
                )}
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </div>
    </div>
  );
}
