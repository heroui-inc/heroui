"use client";

import {Form, InputGroup, Tag, TagGroup, TextField} from "@heroui/react";

export function TagGroupOnFormField() {
  return (
    <Form>
      <TextField className="w-[320px]" name="tags">
        <InputGroup>
          <InputGroup.Prefix>
            <TagGroup isOnFormField>
              <TagGroup.List className="flex flex-wrap gap-1">
                <Tag id="frontend">Frontend</Tag>
              </TagGroup.List>
            </TagGroup>
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="Input your project name" />
        </InputGroup>
      </TextField>
    </Form>
  );
}
