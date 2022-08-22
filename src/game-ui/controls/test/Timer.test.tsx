import { act, render, screen } from '@testing-library/react';
import Timer from 'game-ui/controls/Timer';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('Check timer is stopped', async () => {
  render(<Timer gameStatus='Pending' />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }

  const z = screen.getByTestId('digitZ');
  expect(z.classList).toContain('digit0');
});

test('Check timer is in progress', async () => {
  render(<Timer gameStatus='Progress' />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }

  const z = screen.getByTestId('digitZ');
  expect(z.classList).toContain('digit5');
});
