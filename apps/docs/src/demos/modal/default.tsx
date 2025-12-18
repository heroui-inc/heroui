"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function Default() {
  return (
    <Modal>
      <Button variant="secondary">Open Modal</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Welcome to HeroUI</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                A beautiful, fast, and modern React UI library for building accessible and
                customizable web applications with ease.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
