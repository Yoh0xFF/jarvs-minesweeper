import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from 'game-ui/menu/Menu';

test('Check menu is rendered correctly', async () => {
  render(<Menu difficultyLevel='Beginner' onNewGame={jest.fn()} />);

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
  render(<Menu difficultyLevel='Beginner' onNewGame={jest.fn()} />);

  const inputs = await screen.findAllByRole('radio');
  expect(inputs[0]).toBeChecked();
  expect(inputs[1]).not.toBeChecked();
  expect(inputs[2]).not.toBeChecked();
});

test('Check onNewGame callback is called', async () => {
  const onNewGame = jest.fn();
  render(<Menu difficultyLevel='Beginner' onNewGame={onNewGame} />);

  const inputs = await screen.findAllByRole('radio');
  await userEvent.click(inputs[1]);
  expect(onNewGame).toBeCalled();
});
