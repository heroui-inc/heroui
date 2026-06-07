"use client";

import {Description, Input, Label, TextArea, TextField} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <TextField name="name" value={name} onChange={setName}>
        <Label>显示名称</Label>
        <Input placeholder="Jane" />
        <Description>字符数： {name.length}</Description>
      </TextField>
      <TextField name="bio" value={bio} onChange={setBio}>
        <Label>个人简介</Label>
        <TextArea placeholder="介绍一下你自己…" />
        <Description>字符数： {bio.length} / 200</Description>
      </TextField>
    </div>
  );
}
