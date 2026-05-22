"use client";

import {CircleCheck, CircleInfo} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function CloseMethods() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">使用 slot="close"</h3>
        <p className="text-sm text-muted">
          关闭模态框的最简方式：为模态框内任意 Button 添加 <code>slot="close"</code>
          ，点击即可自动关闭。
        </p>
        <Modal>
          <Button variant="secondary">打开模态框</Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.Header>
                  <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                    <CircleInfo className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>使用 slot="close"</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    点击下方任一按钮——它们都带有 <code>slot="close"</code>，会自动关闭模态框。
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
        </Modal>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">使用 Dialog 渲染属性</h3>
        <p className="text-sm text-muted">
          通过 Dialog 的渲染属性访问 <code>close</code>{" "}
          方法，可完全控制关闭时机与方式，并在关闭前加入自定义逻辑。
        </p>
        <Modal>
          <Button variant="secondary">打开模态框</Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[360px]">
                {(renderProps) => (
                  <>
                    <Modal.Header>
                      <Modal.Icon className="bg-success-soft text-success-soft-foreground">
                        <CircleCheck className="size-5" />
                      </Modal.Icon>
                      <Modal.Heading>使用 Dialog 渲染属性</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        下方按钮使用渲染属性中的 <code>close</code> 方法。可在调用{" "}
                        <code>renderProps.close()</code> 前进行校验或其他逻辑。
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onPress={() => renderProps.close()}>
                        取消
                      </Button>
                      <Button onPress={() => renderProps.close()}>确认</Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>
    </div>
  );
}
