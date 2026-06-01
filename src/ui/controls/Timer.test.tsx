import { act, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import Timer from './Timer';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

test('Check timer is stopped', async () => {
  render(<Timer gameStatus='Pending' />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }

  const z = screen.getByTestId('digitZ');
  expect(z.className).includes('digit0');
});

test('Check timer is in progress', async () => {
  render(<Timer gameStatus='Progress' />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }

  const z = screen.getByTestId('digitZ');
  expect(z.className).includes('digit5');
});
