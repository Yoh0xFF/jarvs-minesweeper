import Controls from "../controls/Controls";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

test("Check onReset callback is called on click", async () => {
  const onReset = vi.fn();

  render(<Controls gameStatus="Pending" mineCount={10} onReset={onReset} />);

  const button = await screen.findByRole("button");
  await userEvent.click(button);
  expect(onReset).toBeCalled();
});

test("Check mines number is rendered correctly", async () => {
  render(<Controls gameStatus="Pending" mineCount={12} onReset={vi.fn()} />);

  const y = screen.getAllByTestId("digitY");
  const z = screen.getAllByTestId("digitZ");

  // Mine tableau
  expect(y[0].className).includes("digit1");
  expect(z[0].className).includes("digit2");

  // Timer tableau
  expect(y[1].className).includes("empty");
  expect(z[1].className).includes("digit0");
});

test("Check timer is working when game is in progress", async () => {
  vi.useFakeTimers();

  render(<Controls gameStatus="Progress" mineCount={12} onReset={vi.fn()} />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }

  const y = screen.getAllByTestId("digitY");
  const z = screen.getAllByTestId("digitZ");

  // Mine tableau
  expect(y[0].className).includes("digit1");
  expect(z[0].className).includes("digit2");

  // Timer tableau
  expect(y[1].className).includes("empty");
  expect(z[1].className).includes("digit5");

  vi.useRealTimers();
});
