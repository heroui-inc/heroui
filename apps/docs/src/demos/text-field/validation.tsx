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
      <TextField isRequired isInvalid={isUsernameInvalid} name="username" onChange={setUsername}>
        <Label>Username</Label>
        <Input placeholder="jane_doe" value={username} />
        {isUsernameInvalid ? (
          <FieldError>Username must be at least 3 characters.</FieldError>
        ) : (
          <Description>Choose a unique username for your profile.</Description>
        )}
      </TextField>

      <TextField isRequired isInvalid={isBioInvalid} name="bio" onChange={setBio}>
        <Label>Bio</Label>
        <TextArea placeholder="Tell us about yourself..." value={bio} />
        {isBioInvalid ? (
          <FieldError>Bio must contain at least 20 characters.</FieldError>
        ) : (
          <Description>Minimum 20 characters ({bio.length}/20).</Description>
        )}
      </TextField>
    </div>
  );
}
