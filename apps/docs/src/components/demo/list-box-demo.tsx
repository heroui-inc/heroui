"use client";

import {Description, Header, Kbd, Label, ListBox, Separator, Surface} from "@heroui/react";

import {Iconify} from "@/components/iconify";
import {useDictionary} from "@/hooks/use-dictionary";

export function ListBoxDemo() {
  const {demos} = useDictionary();
  const t = demos.listBox;

  return (
    <Surface className="w-[256px] rounded-3xl shadow-surface">
      <ListBox aria-label={t.ariaLabel} className="w-full p-2" selectionMode="none">
        <ListBox.Section>
          <Header>{t.actions}</Header>
          <ListBox.Item id="new-file" textValue={t.newFile}>
            <div className="flex h-8 items-start justify-center pt-px">
              <Iconify className="size-4 shrink-0 text-muted" icon="gravity-ui:square-plus" />
            </div>
            <div className="flex flex-col">
              <Label>{t.newFile}</Label>
              <Description>{t.newFileDescription}</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </ListBox.Item>
          <ListBox.Item id="edit-file" textValue={t.editFile}>
            <div className="flex h-8 items-start justify-center pt-px">
              <Iconify className="size-4 shrink-0 text-muted" icon="gravity-ui:pencil" />
            </div>
            <div className="flex flex-col">
              <Label>{t.editFile}</Label>
              <Description>{t.editFileDescription}</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>E</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
        <Separator />
        <ListBox.Section>
          <Header>{t.dangerZone}</Header>
          <ListBox.Item id="delete-file" textValue={t.deleteFile} variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <Iconify className="size-4 shrink-0 text-danger" icon="gravity-ui:trash-bin" />
            </div>
            <div className="flex flex-col">
              <Label>{t.deleteFile}</Label>
              <Description>{t.deleteFileDescription}</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
    </Surface>
  );
}
