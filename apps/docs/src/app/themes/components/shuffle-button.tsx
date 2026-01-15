"use client";

import {Shuffle} from "@gravity-ui/icons";
import {AlertDialog, Button, Checkbox, Kbd, Label, Tooltip, useOverlayState} from "@heroui/react";
import {useEffect, useRef, useState} from "react";

import {useKeyPress} from "@/hooks/use-key-press";

import {LOCAL_STORAGE_KEYS} from "../constants";
import {useRandomizeVariables} from "../hooks";
import {useVariablesState} from "../hooks/use-variables-state";
import {compareThemeVariables} from "../utils/compare-theme-variables";

export function ShuffleButton() {
  const [isDontShowAgainChecked, setIsDontShowAgainChecked] = useState(false);
  const modalState = useOverlayState();
  const randomize = useRandomizeVariables();
  const [variables] = useVariablesState();
  const snapshotVariablesRef = useRef(variables);
  const isRandomizingRef = useRef(false);

  const handleRandomize = () => {
    isRandomizingRef.current = true;
    randomize();
    if (isDontShowAgainChecked) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SHUFFLE_WARNING_SHOWN, JSON.stringify(true));
    }
    modalState.close();
  };

  const handleModalTrigger = () => {
    const isDontShowAgainChecked = localStorage.getItem(LOCAL_STORAGE_KEYS.SHUFFLE_WARNING_SHOWN);
    const isSame = compareThemeVariables(variables, snapshotVariablesRef.current);

    if (isSame || isDontShowAgainChecked === "true") {
      isRandomizingRef.current = true;

      return randomize();
    }

    modalState.open();
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

  // Update snapshot after randomize completes (when variables change due to randomization)
  useEffect(() => {
    if (isRandomizingRef.current) {
      snapshotVariablesRef.current = variables;
      isRandomizingRef.current = false;
    }
  }, [variables]);

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
                  variant="secondary"
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
