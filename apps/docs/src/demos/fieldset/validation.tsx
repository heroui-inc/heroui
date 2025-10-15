"use client";

import {Button, Description, FieldError, Fieldset, Input, Label, TextField} from "@heroui/react";
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
          <Label>New password</Label>
          <Input
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
          {passwordTooShort ? (
            <FieldError>Password must be at least 8 characters.</FieldError>
          ) : (
            <Description>Use a strong password with letters, numbers, and symbols.</Description>
          )}
        </TextField>

        <TextField isRequired isInvalid={confirmationInvalid}>
          <Label>Confirm password</Label>
          <Input
            placeholder="Repeat password"
            type="password"
            value={confirm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setConfirm(event.target.value)
            }
          />
          {confirmationInvalid ? (
            <FieldError>Passwords must match.</FieldError>
          ) : (
            <Description>Re-enter your password to confirm.</Description>
          )}
        </TextField>
      </Fieldset.Group>
      <Fieldset.Actions>
        <Button isDisabled={isSubmitDisabled} variant="primary">
          Update password
        </Button>
      </Fieldset.Actions>
    </Fieldset>
  );
}
