"use client";

import {Description, FieldError, Input, Label, TextArea, TextField} from "@heroui/react";
import React from "react";

export function Validation() {
  const [username, setUsername] = React.useState("");
  const [bio, setBio] = React.useState("");

  const isUsernameInvalid = username.length > 0 && username.length < 3;
  const isBioInvalid = bio.length > 0 && bio.length < 20;

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <TextField
        isRequired
        isInvalid={isUsernameInvalid}
        name="username"
        value={username}
        onChange={setUsername}
      >
        <Label>用户名</Label>
        <Input placeholder="jane_doe" />
        {isUsernameInvalid ? (
          <FieldError>用户名至少需要 3 个字符。</FieldError>
        ) : (
          <Description>为你的资料选择一个唯一的用户名。</Description>
        )}
      </TextField>

      <TextField isRequired isInvalid={isBioInvalid} name="bio" value={bio} onChange={setBio}>
        <Label>个人简介</Label>
        <TextArea placeholder="介绍一下你自己…" />
        {isBioInvalid ? (
          <FieldError>个人简介至少需要 20 个字符。</FieldError>
        ) : (
          <Description>至少 20 个字符 ({bio.length}/20).</Description>
        )}
      </TextField>
    </div>
  );
}
