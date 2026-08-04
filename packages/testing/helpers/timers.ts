import {act} from "@testing-library/react";
import {vi} from "vitest";

export const runAllTimers = () => {
  act(() => {
    vi.runAllTimers();
  });
};

export const advanceTimersByTime = (ms: number) => {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
};
