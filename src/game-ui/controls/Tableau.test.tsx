import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Tableau from './Tableau';

test('Check tableau positive oveflow', async () => {
  render(<Tableau number={1000} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.className).includes('digit9');
  expect(y.className).includes('digit9');
  expect(z.className).includes('digit9');
});

test('Check tableau negative oveflow', async () => {
  render(<Tableau number={-100} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.className).includes('minus');
  expect(y.className).includes('digit9');
  expect(z.className).includes('digit9');
});

test('Check tableau rendered correctly with positive number', async () => {
  render(<Tableau number={125} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.className).includes('digit1');
  expect(y.className).includes('digit2');
  expect(z.className).includes('digit5');
});

test('Check tableau rendered correctly with negative number', async () => {
  render(<Tableau number={-25} />);

  const x = screen.getByTestId('digitX');
  const y = screen.getByTestId('digitY');
  const z = screen.getByTestId('digitZ');
  expect(x.className).includes('minus');
  expect(y.className).includes('digit2');
  expect(z.className).includes('digit5');
});
