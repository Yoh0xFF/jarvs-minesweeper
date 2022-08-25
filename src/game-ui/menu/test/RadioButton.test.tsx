import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioButton from 'game-ui/menu/RadioButton';

test('Check onClick callback is called', async () => {
  const onClick = jest.fn();
  render(
    <RadioButton difficultyLevel='Beginner' checked={false} onClick={onClick} />
  );

  const input = await screen.findByRole('radio');
  await userEvent.click(input);
  expect(onClick).toBeCalled();
});

test('Check selected flag is set', async () => {
  render(
    <RadioButton
      difficultyLevel='Beginner'
      checked={true}
      onClick={jest.fn()}
    />
  );

  const input = await screen.findByRole('radio');
  expect(input).toBeChecked();
});

test('Check label is set', async () => {
  render(
    <RadioButton
      difficultyLevel='Beginner'
      checked={true}
      onClick={jest.fn()}
    />
  );

  const element = await screen.findByText('Beginner');
  expect(element).not.toBeNull();
});
