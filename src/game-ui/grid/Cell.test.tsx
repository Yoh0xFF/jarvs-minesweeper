import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import {
  CellType,
  CellTypes,
  MaskType,
  MaskTypes,
} from '../../game-logic/types';
import Cell from '../grid/Cell';

function initByMaskType(maskType: MaskType) {
  return (
    <Cell
      x={0}
      y={0}
      gameStatus={'Progress'}
      cellType={CellTypes.Empty}
      maskType={maskType}
      onCellOpen={vi.fn()}
      onCellMark={vi.fn()}
    />
  );
}

function initByCellType(cellType: CellType) {
  return (
    <Cell
      x={0}
      y={0}
      gameStatus={'Progress'}
      cellType={cellType}
      maskType={MaskTypes.Open}
      onCellOpen={vi.fn()}
      onCellMark={vi.fn()}
    />
  );
}

test('Check mask type class names', async () => {
  render(
    <>
      {initByMaskType(MaskTypes.Closed)}
      {initByMaskType(MaskTypes.Marked)}
      {initByMaskType(MaskTypes.MarkedWrongly)}
    </>,
  );

  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(3);
  expect(buttons[0].className).includes('closed');
  expect(buttons[1].className).includes('marked');
  expect(buttons[2].className).includes('markedWrongly');
});

test('Check cell type class names', async () => {
  render(
    <>
      {initByCellType(CellTypes.Empty)}
      {initByCellType(CellTypes.MineExploded)}
      {initByCellType(CellTypes.Mine)}
      {initByCellType(CellTypes.One)}
      {initByCellType(CellTypes.Two)}
    </>,
  );

  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(5);
  expect(buttons[0].className).includes('open');
  expect(buttons[1].className).includes('mineExploded');
  expect(buttons[2].className).includes('mine');
  expect(buttons[3].className).includes('hint1');
  expect(buttons[4].className).includes('hint2');
});

test('Open cell callback called on click event', async () => {
  const x = 1,
    y = 2;
  const onCellOpen = vi.fn();

  render(
    <Cell
      x={x}
      y={y}
      gameStatus={'Progress'}
      cellType={CellTypes.Empty}
      maskType={MaskTypes.Closed}
      onCellOpen={onCellOpen}
      onCellMark={vi.fn()}
    />,
  );

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  expect(onCellOpen).toHaveBeenCalledWith(x, y);
});

test('Mark cell callback called on context menu event', async () => {
  const x = 1,
    y = 2;
  const onCellMark = vi.fn();

  render(
    <Cell
      x={x}
      y={y}
      gameStatus={'Progress'}
      cellType={CellTypes.Empty}
      maskType={MaskTypes.Closed}
      onCellOpen={vi.fn()}
      onCellMark={onCellMark}
    />,
  );

  const button = await screen.findByRole('button');
  fireEvent.contextMenu(button);
  expect(onCellMark).toHaveBeenCalledWith(x, y);
});

test('Callbacks are not called for the finished game', async () => {
  const onCellOpen = vi.fn();
  const onCellMark = vi.fn();

  render(
    <Cell
      x={1}
      y={2}
      gameStatus={'Success'}
      cellType={CellTypes.Empty}
      maskType={MaskTypes.Closed}
      onCellOpen={onCellOpen}
      onCellMark={onCellMark}
    />,
  );

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  fireEvent.contextMenu(button);
  expect(onCellMark).not.toBeCalled();
  expect(onCellMark).not.toBeCalled();
});
