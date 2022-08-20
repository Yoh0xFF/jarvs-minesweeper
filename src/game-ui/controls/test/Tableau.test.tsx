import { render, screen } from '@testing-library/react';
import Tableau from 'game-ui/controls/Tableau';

test('Check tableau positive oveflow', async () => {
  render(<Tableau number={1000} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.classList).toContain('digit9');
  expect(y.classList).toContain('digit9');
  expect(z.classList).toContain('digit9');
});

test('Check tableau negative oveflow', async () => {
  render(<Tableau number={-100} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.classList).toContain('minus');
  expect(y.classList).toContain('digit9');
  expect(z.classList).toContain('digit9');
});

test('Check tableau rendered correctly with positive number', async () => {
  render(<Tableau number={125} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.classList).toContain('digit1');
  expect(y.classList).toContain('digit2');
  expect(z.classList).toContain('digit5');
});

test('Check tableau rendered correctly with negative number', async () => {
  render(<Tableau number={-25} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.classList).toContain('minus');
  expect(y.classList).toContain('digit2');
  expect(z.classList).toContain('digit5');
});
