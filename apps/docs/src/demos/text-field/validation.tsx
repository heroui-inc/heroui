"use client";

import {TextField} from "@heroui/react";
import React from "react";

export function Validation() {
  const [username, setUsername] = React.useState("");
  const [bio, setBio] = React.useState("");

  const usernameInvalid = username.length > 0 && username.length < 3;
  const bioInvalid = bio.length > 0 && bio.length < 20;

  return (
    <div className="flex w-96 flex-col gap-4">
      <TextField isRequired isInvalid={usernameInvalid}>
        <TextField.Label>Username</TextField.Label>
        <TextField.Input
          placeholder="jane_doe"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {usernameInvalid ? (
          <TextField.Error>Username must be at least 3 characters.</TextField.Error>
        ) : (
          <TextField.Description>Choose a unique username for your profile.</TextField.Description>
        )}
      </TextField>

      <TextField isRequired isInvalid={bioInvalid}>
        <TextField.Label>Bio</TextField.Label>
        <TextField.TextArea
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
        {bioInvalid ? (
          <TextField.Error>Bio must contain at least 20 characters.</TextField.Error>
        ) : (
          <TextField.Description>Minimum 20 characters ({bio.length}/20).</TextField.Description>
        )}
      </TextField>
    </div>
  );
}
