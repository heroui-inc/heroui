"use client";

import {AlertDialog, Button, Description, Drawer, Label, TextArea, TextField} from "@heroui/react";
import React from "react";

export function ConfirmClose() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [draftNote, setDraftNote] = React.useState("");
  const [savedNote, setSavedNote] = React.useState("");

  const hasUnsavedChanges = draftNote !== savedNote;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedNote(draftNote);
    setIsDrawerOpen(false);
  };

  const handleDrawerOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setIsDrawerOpen(true);

      return;
    }

    if (hasUnsavedChanges) {
      setIsConfirmOpen(true);

      return;
    }

    setIsDrawerOpen(false);
  };

  const discardChanges = () => {
    setDraftNote(savedNote);
    setIsConfirmOpen(false);
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3 rounded-2xl bg-surface p-4 shadow-sm">
      <div className="flex w-full flex-col gap-1">
        <p className="text-xs text-muted">
          Saved note:{" "}
          <span className="font-mono font-medium text-foreground">
            {savedNote ? "saved" : "empty"}
          </span>
        </p>
        <p className="line-clamp-2 text-sm leading-6 text-foreground">
          {savedNote || "No note saved yet."}
        </p>
      </div>
      <Button size="sm" variant="secondary" onPress={() => setIsDrawerOpen(true)}>
        Open Drawer
      </Button>

      <Drawer.Backdrop isOpen={isDrawerOpen} onOpenChange={handleDrawerOpenChange}>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Edit note</Drawer.Heading>
              <Description>Save your note, or discard it if you change your mind.</Description>
            </Drawer.Header>
            <Drawer.Body>
              <form className="flex flex-col gap-4" id="drawer-note-form" onSubmit={handleSubmit}>
                <TextField name="note" value={draftNote} onChange={setDraftNote}>
                  <Label>Note</Label>
                  <TextArea autoFocus placeholder="Write a short note..." rows={8} />
                </TextField>
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Button
                type="button"
                variant="secondary"
                onPress={() => handleDrawerOpenChange(false)}
              >
                Cancel
              </Button>
              <Button form="drawer-note-form" type="submit">
                Save note
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>

      <AlertDialog.Backdrop isOpen={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="warning" />
              <AlertDialog.Heading>Discard changes?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>You have unsaved changes. If you leave now, they will be lost.</p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Keep editing
              </Button>
              <Button variant="danger" onPress={discardChanges}>
                Discard changes
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </div>
  );
}
