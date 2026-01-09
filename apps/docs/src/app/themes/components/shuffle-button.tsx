"use client";

import {Shuffle} from "@gravity-ui/icons";
import {AlertDialog, Button, Checkbox, Kbd, Label, Tooltip, useOverlayState} from "@heroui/react";
import {useState} from "react";

import {useKeyPress} from "@/hooks/use-key-press";

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

  useKeyPress("r", handleModalTrigger);

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
      <div className="h-5" />
      <Tooltip delay={0}>
        <Tooltip.Trigger className="w-min">
          <Button isIconOnly size="md" variant="tertiary" onPress={handleModalTrigger}>
            <Shuffle />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <p>
            Randomize{" "}
            <Kbd>
              <Kbd.Content>R</Kbd.Content>
            </Kbd>
          </p>
        </Tooltip.Content>
      </Tooltip>
      <AlertDialog.Backdrop isOpen={modalState.isOpen} onOpenChange={handleOpenChange}>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="default">
                <Shuffle />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Are you sure you want to randomize?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>This will overwrite your current theme settings.</AlertDialog.Body>
            <AlertDialog.Footer>
              <div className="flex flex-1 items-center gap-2">
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
              <Button size="md" variant="tertiary" onPress={handleClose}>
                Cancel
              </Button>
              <Button size="md" onPress={handleRandomize}>
                Confirm
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </div>
  );
}
