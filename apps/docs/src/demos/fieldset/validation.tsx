"use client";

import {Button, Fieldset, TextField} from "@heroui/react";
import React from "react";

export function Validation() {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const passwordTooShort = password.length > 0 && password.length < 8;
  const confirmationInvalid = confirm.length > 0 && confirm !== password;

  const isSubmitDisabled = passwordTooShort || confirmationInvalid || !password || !confirm;

  return (
    <Fieldset className="w-full max-w-md">
      <Fieldset.Legend>Security</Fieldset.Legend>
      <Fieldset.Group>
        <TextField isRequired isInvalid={passwordTooShort}>
          <TextField.Label>New password</TextField.Label>
          <TextField.Input
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordTooShort ? (
            <TextField.Error>Password must be at least 8 characters.</TextField.Error>
          ) : (
            <TextField.Description>
              Use a strong password with letters, numbers, and symbols.
            </TextField.Description>
          )}
        </TextField>

        <TextField isRequired isInvalid={confirmationInvalid}>
          <TextField.Label>Confirm password</TextField.Label>
          <TextField.Input
            placeholder="Repeat password"
            type="password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />
          {confirmationInvalid ? (
            <TextField.Error>Passwords must match.</TextField.Error>
          ) : (
            <TextField.Description>Re-enter your password to confirm.</TextField.Description>
          )}
        </TextField>
      </Fieldset.Group>
      <Fieldset.Actions>
        <Button color="primary" isDisabled={isSubmitDisabled}>
          Update password
        </Button>
      </Fieldset.Actions>
    </Fieldset>
  );
}
