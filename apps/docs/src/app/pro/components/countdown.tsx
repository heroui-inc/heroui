"use client";

import {Calligraph} from "calligraph";
import {useEffect, useState} from "react";

import {env} from "~env";

const PRE_SALE_END = new Date(env.NEXT_PUBLIC_PRE_SALE_END_DATE ?? "2026-03-30T00:00:00");

function getTimeRemaining() {
  const now = new Date();
  const diff = Math.max(0, PRE_SALE_END.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

export function Countdown({long}: {long?: boolean}) {
  const [time, setTime] = useState<ReturnType<typeof getTimeRemaining> | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setTime(getTimeRemaining()));
    const id = setInterval(() => setTime(getTimeRemaining()), 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, []);

  if (!time) {
    // Render placeholder with same structure to avoid layout shift
    const placeholder = {days: "--", hours: "--", minutes: "--", seconds: "--"};

    if (long) {
      return (
        <span className="tabular-nums">
          <span className="font-normal text-muted">Pre-sale closes in</span>{" "}
          <span className="font-medium text-foreground">
            {placeholder.days} days {placeholder.hours} hours {placeholder.minutes} minutes{" "}
            {placeholder.seconds} seconds
          </span>
          <span className="font-normal text-muted">. Prices increase at launch.</span>
        </span>
      );
    }

    return (
      <span className="tabular-nums">
        Pre-sale ends in {placeholder.days}d {placeholder.hours}h {placeholder.minutes}m{" "}
        {placeholder.seconds}s
      </span>
    );
  }

  if (long) {
    return (
      <span className="tabular-nums">
        <span className="font-normal text-muted">Pre-sale closes in</span>{" "}
        <span className="font-medium text-foreground">
          <Calligraph animation="snappy" variant="number">
            {time.days}
          </Calligraph>{" "}
          days{" "}
          <Calligraph animation="snappy" variant="number">
            {time.hours}
          </Calligraph>{" "}
          hours{" "}
          <Calligraph animation="snappy" variant="number">
            {time.minutes}
          </Calligraph>{" "}
          minutes{" "}
          <Calligraph animation="snappy" variant="number">
            {time.seconds}
          </Calligraph>{" "}
          seconds
        </span>
        <span className="font-normal text-muted">. Prices increase at launch.</span>
      </span>
    );
  }

  return (
    <span className="tabular-nums">
      Pre-sale ends in{" "}
      <Calligraph animation="snappy" variant="number">
        {time.days}
      </Calligraph>
      d{" "}
      <Calligraph animation="snappy" variant="number">
        {time.hours}
      </Calligraph>
      h{" "}
      <Calligraph animation="snappy" variant="number">
        {time.minutes}
      </Calligraph>
      m{" "}
      <Calligraph animation="snappy" variant="number">
        {time.seconds}
      </Calligraph>
      s
    </span>
  );
}
