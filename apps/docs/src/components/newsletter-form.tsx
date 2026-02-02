"use client";

import {Button, FieldError, Form, Input, Label, Spinner, TextField} from "@heroui/react";
import {AnimatePresence, LazyMotion, domAnimation} from "motion/react";
import * as m from "motion/react-m";
import React from "react";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiErrorMessage, setApiErrorMessage] = React.useState<string | null>(null);

  const circleCheckIcon = (
    <svg fill="none" height="16" viewBox="0 0 17 16" width="17" xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="M8.5 15C12.366 15 15.5 11.866 15.5 8C15.5 4.13401 12.366 1 8.5 1C4.63401 1 1.5 4.13401 1.5 8C1.5 11.866 4.63401 15 8.5 15ZM11.6 6.45C11.8485 6.11863 11.7814 5.64853 11.45 5.4C11.1186 5.15147 10.6485 5.21863 10.4 5.55L7.91885 8.85819L6.53033 7.46967C6.23744 7.17678 5.76256 7.17678 5.46967 7.46967C5.17678 7.76256 5.17678 8.23744 5.46967 8.53033L7.46967 10.5303C7.62341 10.6841 7.8363 10.7635 8.05317 10.7481C8.27004 10.7327 8.46955 10.6239 8.6 10.45L11.6 6.45Z"
        fill="#24864E"
        fillRule="evenodd"
      />
    </svg>
  );

  const subscribeButton = {
    error: "Subscribe",
    idle: "Subscribe",
    loading: (
      <div className="flex w-full items-center justify-center">
        <Spinner color="current" size="sm" />
      </div>
    ),
    success: circleCheckIcon,
  };

  const getButtonContentKey = (status: "idle" | "loading" | "success" | "error") => {
    if (status === "idle" || status === "error")
      return status === "idle" || status === "error" ? "subscribe" : status;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;

    if (!emailValue) {
      return;
    }

    setStatus("loading");
    setApiErrorMessage(null);

    try {
      // Loops - newsletter
      const newsletterResponse = await fetch("/api/newsletter", {
        body: JSON.stringify({
          email: emailValue,
          source: "Subscribe from HeroUI Docs",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const newsletterResData = await newsletterResponse.json();

      if (!newsletterResData.success) {
        throw new Error(newsletterResData.error || "Failed to subscribe newsletter");
      }

      // Temporarily disable changelog subscription
      // Featurebase - changelog
      // const changelogResponse = await fetch("/api/changelog", {
      //   body: JSON.stringify({
      //     email: emailValue,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "POST",
      // });

      // const changelogResData = await changelogResponse.json();

      // if (!changelogResData.success) {
      //   throw new Error(changelogResData.error || "Failed to subscribe changelog");
      // }

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setApiErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="relative w-full py-3">
      <div className="relative h-[172px] w-full">
        <Form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <TextField
            isRequired
            className="flex w-full flex-col gap-1"
            isDisabled={status === "loading"}
            name="email"
            type="email"
            value={email}
            validate={(value) => {
              if (!value) {
                return "Email is required";
              }

              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Please enter a valid email.";
              }

              return null;
            }}
            onChange={setEmail}
          >
            <Label className="pb-1 text-sm font-medium tracking-[-0.07px] after:hidden">
              Hero Newsletter
            </Label>
            <Input placeholder="name@email.com" value={email} />
            <FieldError className="mt-1 px-1 text-xs" />
            {apiErrorMessage && status === "error" ? (
              <p className="mt-1 px-1 text-xs text-danger">{apiErrorMessage}</p>
            ) : null}
          </TextField>
          <Button
            className="w-full"
            isPending={status === "loading" || status === "success"}
            type="submit"
            variant="tertiary"
            style={{
              // @ts-expect-error --disabled-opacity is a css variable
              "--disabled-opacity": 100,
            }}
          >
            <LazyMotion features={domAnimation}>
              <AnimatePresence initial={false} mode="popLayout">
                <m.span
                  key={getButtonContentKey(status)}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 25}}
                  initial={{opacity: 0, y: -25}}
                  transition={{bounce: 0, duration: 0.3, type: "spring"}}
                >
                  {subscribeButton[status]}
                </m.span>
              </AnimatePresence>
            </LazyMotion>
          </Button>
        </Form>
      </div>
    </div>
  );
}
