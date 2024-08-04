import Timer from "./Timer";
import { act, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

test("Check timer is stopped", async () => {
  render(<Timer gameStatus="Pending" />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }

  const z = screen.getByTestId("digitZ");
  expect(z.className).includes("digit0");
});

test("Check timer is in progress", async () => {
  render(<Timer gameStatus="Progress" />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }

  const z = screen.getByTestId("digitZ");
  expect(z.className).includes("digit5");
});
