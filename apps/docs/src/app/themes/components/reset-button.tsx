import {ArrowRotateLeft} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";
import {useMemo} from "react";

import {defaultThemeValues} from "../constants";
import {useResetVariables} from "../hooks";
import {useVariablesState} from "../hooks/use-variables-state";

export function ResetButton() {
  const reset = useResetVariables();
  const [variables] = useVariablesState();

  const isDisabled = useMemo(() => {
    return (
      variables.chroma === defaultThemeValues.chroma &&
      variables.hue === defaultThemeValues.hue &&
      variables.lightness === defaultThemeValues.lightness &&
      variables.fontFamily === defaultThemeValues.fontFamily &&
      variables.formRadius === defaultThemeValues.formRadius &&
      variables.radius === defaultThemeValues.radius &&
      variables.theme === defaultThemeValues.theme &&
      variables.base === defaultThemeValues.base
    );
  }, [variables]);

  return (
    <AlertDialog>
      <Button isIconOnly isDisabled={isDisabled} size="md" variant="tertiary">
        <ArrowRotateLeft />
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="default">
                <ArrowRotateLeft />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Reset theme to default?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              This will restore all theme values to their default settings.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button size="md" slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button size="md" slot="close" onPress={reset}>
                Confirm
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
