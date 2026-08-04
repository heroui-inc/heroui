import {AlertDialog} from "@/components/alert-dialog";
import {Button} from "@/components/button";

export type AlertDialogFixtureProps = {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
};

export const AlertDialogFixture = (props: AlertDialogFixtureProps = {}) => (
  <AlertDialog defaultOpen={props.defaultOpen} onOpenChange={props.onOpenChange}>
    <Button>Delete Project</Button>
    <AlertDialog.Backdrop
      isDismissable={props.isDismissable}
      isKeyboardDismissDisabled={props.isKeyboardDismissDisabled}
    >
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <p>This action cannot be undone.</p>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="tertiary">
              Cancel
            </Button>
            <Button slot="close" variant="danger">
              Delete Project
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
);
