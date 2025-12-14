"use client";

import {TrashBin} from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";

export function CustomTrigger() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <div className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all hover:bg-surface-secondary hover:shadow">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-danger-soft text-danger-soft-foreground transition-transform group-hover:scale-105">
            <TrashBin className="size-6" />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-sm leading-5 font-semibold text-foreground">Delete Item</p>
            <p className="text-xs leading-relaxed text-muted">Permanently remove this item</p>
          </div>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          {({close}) => (
            <>
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger">
                  <TrashBin className="size-5" />
                </AlertDialog.Icon>
                <AlertDialog.Heading>Delete this item?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This item will be permanently deleted and cannot be recovered. Are you sure you
                  want to proceed?
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button variant="tertiary" onPress={close}>
                  Cancel
                </Button>
                <Button variant="danger" onPress={close}>
                  Delete Item
                </Button>
              </AlertDialog.Footer>
            </>
          )}
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog>
  );
}
