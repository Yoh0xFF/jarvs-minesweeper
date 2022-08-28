import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { boardConfigs } from 'game-logic/utils';
import Game from 'game-ui/Game';

test('Check default difficulty level', async () => {
  render(<Game />);

  const [rows, cols] = boardConfigs.get('Beginner') ?? [0, 0, 0];

  const menuButtons = await screen.findAllByRole('radio');
  expect(menuButtons).toHaveLength(3);
  expect(menuButtons[0]).toBeChecked();

  const gridCells = await screen.findAllByTestId('gridCell');
  expect(gridCells).toHaveLength(rows * cols);

  const y = screen.getAllByTestId('digitY');
  const z = screen.getAllByTestId('digitZ');
  expect(y[0].classList).toContain('digit1');
  expect(z[0].classList).toContain('digit0');
});

test('Check change difficulty level', async () => {
  render(<Game />);

  const [rows, cols] = boardConfigs.get('Intermediate') ?? [0, 0, 0];

  const menuButtons = await screen.findAllByRole('radio');
  await userEvent.click(menuButtons[1]);

  const gridCells = await screen.findAllByTestId('gridCell');
  expect(gridCells).toHaveLength(rows * cols);

  const y = screen.getAllByTestId('digitY');
  const z = screen.getAllByTestId('digitZ');
  expect(y[0].classList).toContain('digit4');
  expect(z[0].classList).toContain('digit0');
});

test('Check game is in progress', async () => {
  jest.useFakeTimers();

  render(<Game />);

  const gridCells = await screen.findAllByTestId('gridCell');
  // userEvent needs some configuration when using fake timers
  fireEvent.click(gridCells[0]);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }

  const z = screen.getAllByTestId('digitZ');
  expect(z[1].classList).toContain('digit5');

  jest.useRealTimers();
});

test('Check marking cell reduces the mine count', async () => {
  jest.useFakeTimers();

  render(<Game />);

  const gridCells = await screen.findAllByTestId('gridCell');
  fireEvent.contextMenu(gridCells[0]);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }

  const y = screen.getAllByTestId('digitY');
  const z = screen.getAllByTestId('digitZ');

  expect(y[0].classList).toContain('empty');
  expect(z[0].classList).toContain('digit9');

  expect(y[1].classList).toContain('empty');
  expect(z[1].classList).toContain('digit5');

  jest.useRealTimers();
});
