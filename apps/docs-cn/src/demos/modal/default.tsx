"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function Default() {
  return (
    <Modal>
      <Button variant="secondary">打开模态框</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>欢迎使用 HeroUI</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>一套美观、快速、现代的 React UI 库，可轻松构建无障碍且高度可定制的 Web 应用。</p>
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
  );
}
