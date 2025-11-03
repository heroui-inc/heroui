"use client";

import {Button, Card, Input, Label, Link, TextField} from "@heroui/react";

export function WithForm() {
  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>Enter your credentials to access your account</Card.Description>
      </Card.Header>
      <Card.Content>
        <form className="flex flex-col gap-4">
          <TextField name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="email@example.com" />
          </TextField>
          <TextField name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="••••••••" />
          </TextField>
        </form>
      </Card.Content>
      <Card.Footer className="flex flex-col gap-2">
        <Button className="w-full">Sign In</Button>
        <Link className="text-center text-sm" href="#">
          Forgot password?
        </Link>
      </Card.Footer>
    </Card>
  );
}
