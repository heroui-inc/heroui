"use client";

import {Button, Modal, Radio, RadioGroup} from "@heroui/react";
import {useState} from "react";

export function ScrollComparison() {
  const [scroll, setScroll] = useState<"inside" | "outside">("inside");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        orientation="horizontal"
        value={scroll}
        onChange={(value) => setScroll(value as "inside" | "outside")}
      >
        <Radio value="inside">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            内部
          </Radio.Content>
        </Radio>
        <Radio value="outside">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            外部
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <Modal>
        <Button variant="secondary">
          打开模态框（{scroll.charAt(0).toUpperCase() + scroll.slice(1)})
        </Button>
        <Modal.Backdrop>
          <Modal.Container scroll={scroll}>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.Header>
                <Modal.Heading>{scroll === "inside" ? "滚动：内部" : "滚动：外部"}</Modal.Heading>
                <p className="text-sm leading-5 text-muted">
                  对比滚动行为——内部在模态框内滚动内容，外部允许页面滚动
                </p>
              </Modal.Header>
              <Modal.Body>
                {Array.from({length: 30}).map((_, i) => (
                  <p key={i} className="mb-3">
                    段落 {i + 1}： Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                    risus, sed porttitor quam.
                  </p>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  取消
                </Button>
                <Button slot="close">确认</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
