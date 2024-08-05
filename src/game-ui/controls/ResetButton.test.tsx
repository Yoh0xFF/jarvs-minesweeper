import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { GameStatus } from '../../game-logic/types';
import ResetButton from './ResetButton';

async function validateClassName(gameStatus: GameStatus, className: string) {
  render(<ResetButton gameStatus={gameStatus} onReset={vi.fn()} />);

  const button = await screen.findByRole('button');
  expect(button.className).includes(className);
}

test('Check pending game reset button face', async () => {
  await validateClassName('Pending', 'unpressed');
});

test('Check in progress game reset button face', async () => {
  await validateClassName('Progress', 'unpressed');
});

test('Check successful game reset button face', async () => {
  await validateClassName('Success', 'success');
});

test('Check failed game reset button face', async () => {
  await validateClassName('Fail', 'fail');
});

test('Check reset callback is called on click', async () => {
  const onReset = vi.fn();
  render(<ResetButton gameStatus='Progress' onReset={onReset} />);

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  expect(onReset).toBeCalled();
});
