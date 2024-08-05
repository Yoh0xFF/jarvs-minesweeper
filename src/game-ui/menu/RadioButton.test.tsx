import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import RadioButton from '../menu/RadioButton';

test('Check onClick callback is called', async () => {
  const onClick = vi.fn();
  render(
    <RadioButton
      difficultyLevel='Beginner'
      checked={false}
      onClick={onClick}
    />,
  );

  const input = await screen.findByRole('radio');
  await userEvent.click(input);
  expect(onClick).toBeCalled();
});

test('Check selected flag is set', async () => {
  render(
    <RadioButton difficultyLevel='Beginner' checked={true} onClick={vi.fn()} />,
  );

  const input = await screen.findByRole('radio');
  expect((input as HTMLInputElement).checked).toBe(true);
});

test('Check label is set', async () => {
  render(
    <RadioButton difficultyLevel='Beginner' checked={true} onClick={vi.fn()} />,
  );

  const element = await screen.findByText('Beginner');
  expect(element).not.toBeNull();
});
