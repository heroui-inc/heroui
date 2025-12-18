"use client";

import {Button, Label, Modal, Radio, RadioGroup} from "@heroui/react";
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
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>Inside</Label>
        </Radio>
        <Radio value="outside">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>Outside</Label>
        </Radio>
      </RadioGroup>

      <Modal>
        <Button variant="secondary">
          Open Modal ({scroll.charAt(0).toUpperCase() + scroll.slice(1)})
        </Button>
        <Modal.Backdrop>
          <Modal.Container scroll={scroll}>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.Header>
                <Modal.Heading>
                  Scroll: {scroll.charAt(0).toUpperCase() + scroll.slice(1)}
                </Modal.Heading>
                <p className="text-sm leading-5 text-muted">
                  Compare scroll behaviors - inside keeps content scrollable within the modal,
                  outside allows page scrolling
                </p>
              </Modal.Header>
              <Modal.Body>
                {Array.from({length: 30}).map((_, i) => (
                  <p key={i} className="mb-3">
                    Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                  </p>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button slot="close">Confirm</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
