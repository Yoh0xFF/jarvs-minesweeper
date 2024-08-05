import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { boardConfigs } from '../game-logic/utils';
import Game from './Game';

test('Check default difficulty level', async () => {
  render(<Game />);

  const [rows, cols] = boardConfigs.get('Beginner') ?? [0, 0, 0];

  const menuButtons = await screen.findAllByRole('radio');
  expect(menuButtons).toHaveLength(3);
  expect((menuButtons[0] as HTMLInputElement).checked).toBe(true);

  const gridCells = await screen.findAllByTestId('gridCell');
  expect(gridCells).toHaveLength(rows * cols);

  const y = screen.getAllByTestId('digitY');
  const z = screen.getAllByTestId('digitZ');
  expect(y[0].className).includes('digit1');
  expect(z[0].className).includes('digit0');
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
  expect(y[0].className).includes('digit4');
  expect(z[0].className).includes('digit0');
});

test('Check game is in progress', async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });

  render(<Game />);

  const gridCells = await screen.findAllByTestId('gridCell');
  // userEvent needs some configuration when using fake timers
  fireEvent.click(gridCells[0]);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }

  const z = screen.getAllByTestId('digitZ');
  expect(z[1].className).includes('digit5');

  vi.useRealTimers();
});

test('Check marking cell reduces the mine count', async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });

  render(<Game />);

  const gridCells = await screen.findAllByTestId('gridCell');
  fireEvent.contextMenu(gridCells[0]);

  for (let i = 0; i < 5; ++i) {
    act(() => {
      vi.advanceTimersByTime(1000);
    });
  }

  const y = screen.getAllByTestId('digitY');
  const z = screen.getAllByTestId('digitZ');

  expect(y[0].className).includes('empty');
  expect(z[0].className).includes('digit9');

  expect(y[1].className).includes('empty');
  expect(z[1].className).includes('digit5');

  vi.useRealTimers();
});
