"use client";

import {Shuffle} from "@gravity-ui/icons";
import {Avatar, Button, Checkbox, Label, Modal, useOverlayState} from "@heroui/react";
import {useState} from "react";

import {LOCAL_STORAGE_KEYS} from "../constants";
import {useRandomizeVariables} from "../hooks";

export function ShuffleButton() {
  const [isDontShowAgainChecked, setIsDontShowAgainChecked] = useState(false);
  const modalState = useOverlayState();
  const randomize = useRandomizeVariables();

  const handleRandomize = () => {
    randomize();
    if (isDontShowAgainChecked) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SHUFFLE_WARNING_SHOWN, JSON.stringify(true));
    }
    modalState.close();
  };

  const handleModalTrigger = () => {
    const isDontShowAgainChecked = localStorage.getItem(LOCAL_STORAGE_KEYS.SHUFFLE_WARNING_SHOWN);

    if (isDontShowAgainChecked !== "true") {
      modalState.open();
    } else {
      randomize();
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDontShowAgainChecked(false);
    modalState.setOpen(isOpen);
  };

  const handleClose = () => {
    setIsDontShowAgainChecked(false);
    modalState.close();
  };

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-transparent">Shuffle</Label>
      <Button isIconOnly size="md" variant="tertiary" onPress={handleModalTrigger}>
        <Shuffle />
      </Button>
      <Modal.Backdrop isOpen={modalState.isOpen} onOpenChange={handleOpenChange}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Avatar>
                <Avatar.Fallback>
                  <Shuffle />
                </Avatar.Fallback>
              </Avatar>
              <Modal.Heading>Are you sure you want to randomize?</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-sm text-muted">This will overwrite your current theme settings.</p>
            </Modal.Body>
            <Modal.Footer className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="dont-show-again"
                  isSelected={isDontShowAgainChecked}
                  onChange={setIsDontShowAgainChecked}
                >
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox>
                <Label htmlFor="dont-show-again">Don't show again</Label>
              </div>
              <div className="flex gap-2">
                <Button size="md" variant="tertiary" onPress={handleClose}>
                  Cancel
                </Button>
                <Button size="md" onPress={handleRandomize}>
                  Confirm
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
}
