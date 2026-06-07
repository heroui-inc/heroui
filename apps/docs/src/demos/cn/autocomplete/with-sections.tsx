"use client";

import type {Key} from "@heroui/react";

import {
  Autocomplete,
  EmptyState,
  Header,
  Label,
  ListBox,
  SearchField,
  Separator,
  useFilter,
} from "@heroui/react";
import {useState} from "react";

export function WithSections() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="选择一个国家"
      selectionMode="single"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>国家</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="搜索国家…" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
            <ListBox.Section>
              <Header>北美洲</Header>
              <ListBox.Item id="usa" textValue="美国">
                美国
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="canada" textValue="加拿大">
                加拿大
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="mexico" textValue="墨西哥">
                墨西哥
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox.Section>
            <Separator />
            <ListBox.Section>
              <Header>欧洲</Header>
              <ListBox.Item id="uk" textValue="英国">
                英国
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="france" textValue="法国">
                法国
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="germany" textValue="德国">
                德国
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="spain" textValue="西班牙">
                西班牙
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="italy" textValue="意大利">
                意大利
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox.Section>
            <Separator />
            <ListBox.Section>
              <Header>亚洲</Header>
              <ListBox.Item id="japan" textValue="日本">
                日本
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="china" textValue="中国">
                中国
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="india" textValue="印度">
                印度
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="south-korea" textValue="韩国">
                韩国
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox.Section>
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
