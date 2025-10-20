"use client";

import {
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  LinkRoot,
} from "@heroui/react";

export function WithForm() {
  return (
    <CardRoot className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="border-border bg-background focus:ring-focus rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
              id="email"
              placeholder="email@example.com"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="border-border bg-background focus:ring-focus rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">Sign In</Button>
        <LinkRoot className="text-center text-sm" href="#">
          Forgot password?
        </LinkRoot>
      </CardFooter>
    </CardRoot>
  );
}
