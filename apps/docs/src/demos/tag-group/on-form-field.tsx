"use client";

import {Description, Form, Label, ListBox, Select, Tag, TagGroup} from "@heroui/react";

export function TagGroupOnFormField() {
  const skills = [
    {id: "react", name: "React"},
    {id: "typescript", name: "TypeScript"},
    {id: "nodejs", name: "Node.js"},
    {id: "python", name: "Python"},
    {id: "java", name: "Java"},
  ];

  return (
    <Form className="w-100">
      <div className="flex flex-col gap-2">
        <Label>Skills</Label>
        <Select
          className="w-full"
          defaultValue={["react", "typescript"]}
          placeholder="Select skills"
          selectionMode="multiple"
        >
          <Select.Trigger>
            <Select.Value className="no-truncate flex flex-wrap gap-2">
              {({defaultChildren, isPlaceholder, state}) => {
                if (isPlaceholder || state.selectedItems.length === 0) {
                  return defaultChildren;
                }

                const selectedItemsKeys = state.selectedItems.map((item) => item.key);

                return (
                  <TagGroup isOnFormField>
                    <TagGroup.List className="flex flex-wrap gap-1">
                      {selectedItemsKeys.map((selectedItemKey) => {
                        const skill = skills.find((s) => s.id === selectedItemKey);

                        if (!skill) return null;

                        return (
                          <Tag key={skill.id} id={skill.id}>
                            {skill.name}
                          </Tag>
                        );
                      })}
                    </TagGroup.List>
                  </TagGroup>
                );
              }}
            </Select.Value>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox selectionMode="multiple">
              {skills.map((skill) => (
                <ListBox.Item key={skill.id} id={skill.id} textValue={skill.name}>
                  {skill.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <Description>Select your technical skills</Description>
      </div>
    </Form>
  );
}
