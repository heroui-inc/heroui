"use client";

import {Button, Modal} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Default() {
  return (
    <Modal>
      <Button>Open Modal</Button>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Icon>
                <Icon icon="gravity-ui:circle-info" />
              </Modal.Icon>
              <Modal.Title>Modal Title</Modal.Title>
              <Modal.Description>This is a modal description.</Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <p>This is the modal body content.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Button>Confirm</Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  );
}
