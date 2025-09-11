"use client";

import {Spinner} from "@heroui/react";
import {AnimatePresence, motion} from "motion/react";
import React from "react";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("Something went wrong. Please try again.");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email.");

      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        body: JSON.stringify({
          email,
          source: "Subscribe from HeroUI Docs",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="relative w-full py-3">
      <div className="relative h-[172px] w-full">
        <form noValidate className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-1">
            <label
              className={`pb-1 text-sm font-medium tracking-[-0.07px] ${status === "error" ? "text-[#e44c3d] dark:text-[#eb5545]" : "text-foreground"}`}
              htmlFor="newsletter-email"
            >
              Hero Newsletter
            </label>
            <div className="relative w-full">
              <input
                required
                disabled={status === "loading"}
                id="newsletter-email"
                placeholder="name@email.com"
                type="email"
                value={email}
                className={`text-foreground placeholder:text-foreground-muted/80 min-h-8 w-full rounded-xl border px-3 py-2 text-[14px] tracking-[-0.28px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_inset_rgba(255,255,255,0.1)] backdrop-blur-[50px] focus:outline-none ${
                  status === "error"
                    ? "border-[#e44c3d] bg-white/0 dark:border-[#eb5545] dark:bg-black/0"
                    : "border-black/[0.04] bg-black/[0.07] dark:bg-white/[0.07]"
                }`}
                onChange={(e) => setEmail(e.target.value)}
              />
              {status === "error" && (
                <p className="mt-1 px-1 text-xs text-[#e44c3d] dark:text-[#eb5545]">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>
          <button
            className="relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-clip rounded-xl border border-black/10 bg-[rgba(250,250,250,0.7)] px-3.5 py-2 text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-[#1b1b1b] transition-opacity duration-200 disabled:cursor-not-allowed dark:border-white/10 dark:bg-[rgba(23,23,23,0.7)] dark:text-[#fcfcfc]"
            disabled={status === "loading" || status === "success"}
            type="submit"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={getButtonContentKey(status)}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 25}}
                initial={{opacity: 0, y: -25}}
                transition={{bounce: 0, duration: 0.3, type: "spring"}}
              >
                {subscribeButton[status]}
              </motion.span>
            </AnimatePresence>
          </button>
        </form>
      </div>
    </div>
  );
}
