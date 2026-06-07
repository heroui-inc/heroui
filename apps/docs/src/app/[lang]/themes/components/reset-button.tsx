"use client";

import {ArrowRotateLeft} from "@gravity-ui/icons";
import {AlertDialog, Button, Kbd, Tooltip, useOverlayState} from "@heroui/react";
import {useMemo} from "react";

import {useDictionary} from "@/hooks/use-dictionary";
import useKeyPress from "@/hooks/use-key-press";

import {defaultThemeVariables} from "../constants";
import {useResetVariables} from "../hooks";
import {useVariablesState} from "../hooks/use-variables-state";

export function ResetButton() {
  const reset = useResetVariables();
  const [variables] = useVariablesState();
  const {isOpen, setOpen} = useOverlayState();
  const dict = useDictionary().themeBuilder.resetButton;

  const isDisabled = useMemo(() => {
    return (
      variables.chroma === defaultThemeVariables.chroma &&
      variables.hue === defaultThemeVariables.hue &&
      variables.lightness === defaultThemeVariables.lightness &&
      variables.fontFamily === defaultThemeVariables.fontFamily &&
      variables.formRadius === defaultThemeVariables.formRadius &&
      variables.radius === defaultThemeVariables.radius &&
      variables.base === defaultThemeVariables.base
    );
  }, [variables]);

  useKeyPress("d", () => setOpen(true), {enabled: !isDisabled});

  return (
    <Tooltip closeDelay={0} delay={100}>
      <Tooltip.Trigger>
        <AlertDialog isOpen={isOpen} onOpenChange={setOpen}>
          <Button isIconOnly isDisabled={isDisabled} size="md" variant="tertiary">
            <ArrowRotateLeft />
          </Button>
          <AlertDialog.Backdrop isDismissable>
            <AlertDialog.Container>
              <AlertDialog.Dialog>
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="default">
                    <ArrowRotateLeft />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading>{dict.dialogTitle}</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>{dict.dialogBody}</AlertDialog.Body>
                <AlertDialog.Footer className="flex-col sm:flex-row">
                  <Button
                    className="order-2 w-full sm:order-1 sm:w-auto"
                    size="md"
                    slot="close"
                    variant="tertiary"
                  >
                    {dict.cancel}
                  </Button>
                  <Button
                    className="order-1 w-full sm:order-2 sm:w-auto"
                    size="md"
                    slot="close"
                    onPress={reset}
                  >
                    {dict.confirm}
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        <p>
          {dict.tooltip}{" "}
          <Kbd>
            <Kbd.Content>D</Kbd.Content>
          </Kbd>
        </p>
      </Tooltip.Content>
    </Tooltip>
  );
}
