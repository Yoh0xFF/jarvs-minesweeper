import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Controls from 'game-ui/controls/Controls';

test('Check onReset callback is called on click', async () => {
  const onReset = jest.fn();

  render(<Controls gameStatus='Pending' mineCount={10} onReset={onReset} />);

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  expect(onReset).toBeCalled();
});

test('Check mines number is rendered correctly', async () => {
  render(<Controls gameStatus='Pending' mineCount={12} onReset={jest.fn()} />);

  const y = screen.getAllByTestId('digitY');
  const z = screen.getAllByTestId('digitZ');

  // Mine tableau
  expect(y[0].classList).toContain('digit1');
  expect(z[0].classList).toContain('digit2');

  // Timer tableau
  expect(y[1].classList).toContain('empty');
  expect(z[1].classList).toContain('digit0');
});

test('Check timer is working when game is in progress', async () => {
  jest.useFakeTimers();

  render(<Controls gameStatus='Progress' mineCount={12} onReset={jest.fn()} />);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }

  const y = screen.getAllByTestId('digitY');
  const z = screen.getAllByTestId('digitZ');

  // Mine tableau
  expect(y[0].classList).toContain('digit1');
  expect(z[0].classList).toContain('digit2');

  // Timer tableau
  expect(y[1].classList).toContain('empty');
  expect(z[1].classList).toContain('digit5');

  jest.useRealTimers();
});
