import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import Menu from '../menu/Menu';

test('Check menu is rendered correctly', async () => {
  render(<Menu difficultyLevel='Beginner' onNewGame={vi.fn()} />);

  const inputs = await screen.findAllByRole('radio');
  expect(inputs).toHaveLength(3);

  let label = await screen.findByText('Beginner');
  expect(label).not.toBeNull();

  label = await screen.findByText('Intermediate');
  expect(label).not.toBeNull();

  label = await screen.findByText('Expert');
  expect(label).not.toBeNull();
});

test('Check menu is selected correctly', async () => {
  render(<Menu difficultyLevel='Beginner' onNewGame={vi.fn()} />);

  const inputs = await screen.findAllByRole('radio');
  expect((inputs[0] as HTMLInputElement).checked).toBe(true);
  expect((inputs[1] as HTMLInputElement).checked).toBe(false);
  expect((inputs[2] as HTMLInputElement).checked).toBe(false);
});

test('Check onNewGame callback is called', async () => {
  const onNewGame = vi.fn();
  render(<Menu difficultyLevel='Beginner' onNewGame={onNewGame} />);

  const inputs = await screen.findAllByRole('radio');
  await userEvent.click(inputs[1]);
  expect(onNewGame).toBeCalled();
});
