"use client";

import {AlertDialog, Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function CustomTrigger() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
        <div className="border-border bg-surface hover:bg-surface-secondary group flex cursor-pointer items-center gap-3 rounded-2xl border p-4 shadow-sm transition-all hover:shadow">
          <div className="bg-danger-soft text-danger-soft-foreground flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
            <Icon className="size-6" icon="gravity-ui:trash-bin" />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-foreground text-sm font-semibold leading-5">Delete Item</p>
            <p className="text-muted text-xs leading-relaxed">Permanently remove this item</p>
          </div>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Container>
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          {({close}) => (
            <>
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger">
                  <Icon className="size-5" icon="gravity-ui:trash-bin" />
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
