"use client";

import {Button, Modal} from "@heroui/react";
import {useState} from "react";

export function ScrollBehavior() {
  const [scroll, setScroll] = useState<"inside" | "outside">("inside");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            checked={scroll === "inside"}
            name="scroll"
            type="radio"
            value="inside"
            onChange={(e) => setScroll(e.target.value as "inside" | "outside")}
          />
          Inside
        </label>

        <label className="flex items-center gap-2">
          <input
            checked={scroll === "outside"}
            name="scroll"
            type="radio"
            value="outside"
            onChange={(e) => setScroll(e.target.value as "inside" | "outside")}
          />
          Outside
        </label>
      </div>

      <Modal.Root>
        <Button>Open Modal ({scroll.charAt(0).toUpperCase() + scroll.slice(1)})</Button>
        <Modal.Overlay>
          <Modal.Container scroll={scroll}>
            <Modal.Dialog>
              <Modal.Header>
                <h2 className="text-foreground text-lg font-semibold leading-6">
                  Scroll: {scroll.charAt(0).toUpperCase() + scroll.slice(1)}
                </h2>
                <p className="text-muted text-sm leading-5">
                  Toggle the radio buttons above to see different scroll behaviors
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
                <Button variant="secondary">Cancel</Button>
                <Button>Confirm</Button>
              </Modal.Footer>
              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Overlay>
      </Modal.Root>
    </div>
  );
}
