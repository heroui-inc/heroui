"use client";

import {AlertDialog, Button} from "@heroui/react";

export function Default() {
  return (
    <AlertDialog>
      <Button variant="danger">Delete Project</Button>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          {({close}) => (
            <>
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete <strong>My Awesome Project</strong> and all of its
                  data. This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button variant="tertiary" onPress={close}>
                  Cancel
                </Button>
                <Button variant="danger" onPress={close}>
                  Delete Project
                </Button>
              </AlertDialog.Footer>
            </>
          )}
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog>
  );
}
