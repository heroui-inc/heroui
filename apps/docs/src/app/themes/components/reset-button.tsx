import {ArrowRotateLeft} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

import {useResetVariables} from "../hooks";

export function ResetButton() {
  const reset = useResetVariables();

  return (
    <AlertDialog>
      <Button isIconOnly size="md" variant="tertiary" onPress={reset}>
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
