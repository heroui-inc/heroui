"use client";

import {Shuffle} from "@gravity-ui/icons";
import {AlertDialog, Button, Checkbox, Kbd, Label, Tooltip, useOverlayState} from "@heroui/react";
import {useEffect, useRef, useState} from "react";

import {useKeyPress} from "@/hooks/use-key-press";

import {LOCAL_STORAGE_KEYS} from "../constants";
import {useRandomizeVariables} from "../hooks";
import {useVariablesState} from "../hooks/use-variables-state";
import {compareThemeVariables} from "../utils/compare-theme-variables";

interface ShuffleButtonProps {
  enableKeyboardShortcut?: boolean;
}

export function ShuffleButton({enableKeyboardShortcut = true}: ShuffleButtonProps) {
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
    const storedShuffleWarning = localStorage.getItem(LOCAL_STORAGE_KEYS.SHUFFLE_WARNING_SHOWN);
    const isSame = compareThemeVariables(variables, snapshotVariablesRef.current);

    if (isSame || storedShuffleWarning === "true") {
      isRandomizingRef.current = true;

      return randomize();
    }

    modalState.open();
  };

  useKeyPress("r", handleModalTrigger, {enabled: enableKeyboardShortcut});

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
      <Tooltip delay={0}>
        <Tooltip.Trigger className="w-min">
          <Button isIconOnly size="md" variant="tertiary" onPress={handleModalTrigger}>
            <Shuffle />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>
            随机化主题{" "}
            <Kbd>
              <Kbd.Content>R</Kbd.Content>
            </Kbd>
          </p>
        </Tooltip.Content>
      </Tooltip>
      <AlertDialog.Backdrop
        isDismissable
        isOpen={modalState.isOpen}
        onOpenChange={handleOpenChange}
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="default">
                <Shuffle />
              </AlertDialog.Icon>
              <AlertDialog.Heading>确定要随机化主题吗？</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>这将覆盖你当前的主题设置。</AlertDialog.Body>
            <AlertDialog.Footer className="flex-col sm:flex-row sm:items-center">
              <Button
                className="order-2 w-full sm:order-2 sm:w-auto"
                size="md"
                variant="tertiary"
                onPress={handleClose}
              >
                取消
              </Button>
              <Button
                className="order-1 w-full sm:order-3 sm:w-auto"
                size="md"
                onPress={handleRandomize}
              >
                确认
              </Button>
              <div className="order-3 flex flex-1 items-center gap-2 self-start sm:order-1 sm:self-center">
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
                <Label htmlFor="dont-show-again">不再显示</Label>
              </div>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </div>
  );
}
