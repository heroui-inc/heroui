"use client";

import {AlertDialog, Button} from "@heroui/react";
import {useCallback, useRef, useState} from "react";

export function CustomPortal() {
  const portalRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const setPortalRef = useCallback((node: HTMLDivElement | null) => {
    portalRef.current = node;
    setPortalContainer(node);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm">
          将警告对话框渲染到自定义容器，而不是 <code>document.body</code>
        </p>
        <p className="text-sm text-muted">
          为容器应用 <code className="rounded px-1 py-0.5 text-xs">transform: translateZ(0)</code>{" "}
          可创建新的层叠上下文。
        </p>
      </div>
      <div
        ref={setPortalRef}
        className="relative flex h-[380px] items-center justify-center overflow-hidden rounded bg-muted/20"
        // new stacking context
        style={{transform: "translate(0)"}}
      >
        {!!portalContainer && (
          <AlertDialog>
            <Button>打开警告对话框</Button>
            <AlertDialog.Backdrop className="h-full" UNSTABLE_portalContainer={portalContainer}>
              <AlertDialog.Container className="h-full max-h-full">
                <AlertDialog.Dialog className="h-full max-h-full sm:max-w-md">
                  <AlertDialog.CloseTrigger />
                  <AlertDialog.Header>
                    <AlertDialog.Icon status="accent" />
                    <AlertDialog.Heading>自定义传送门</AlertDialog.Heading>
                  </AlertDialog.Header>
                  <AlertDialog.Body>
                    <p className="text-sm text-muted">
                      此段为示例占位文案，用于演示在自定义容器内渲染对话框时的滚动与排版效果。实际项目中请替换为真实说明内容。
                    </p>
                    <p className="text-sm text-muted">
                      通过将浮层挂载到局部容器，可以配合裁剪、缩放或卡片布局，避免遮挡整个页面，同时仍保持焦点管理与无障碍行为。
                    </p>
                    <p className="text-sm text-muted">
                      若容器存在 <code>transform</code> 或 <code>filter</code>{" "}
                      等属性，请注意浏览器会为其创建新的包含块，从而影响定位与层级关系。
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
        )}
      </div>
    </div>
  );
}
