import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CellType, CellTypes, MaskType, MaskTypes } from 'game-logic/types';
import Cell from 'game-ui/grid/Cell';

function _initByMaskType(maskType: MaskType) {
  return (
    <Cell
      x={0}
      y={0}
      gameStatus={'Progress'}
      cellType={CellTypes.Empty}
      maskType={maskType}
      onCellOpen={jest.fn()}
      onCellMark={jest.fn()}
    />
  );
}

function _initByCellType(cellType: CellType) {
  return (
    <Cell
      x={0}
      y={0}
      gameStatus={'Progress'}
      cellType={cellType}
      maskType={MaskTypes.Open}
      onCellOpen={jest.fn()}
      onCellMark={jest.fn()}
    />
  );
}

test('Check mask type class names', async () => {
  render(
    <>
      {_initByMaskType(MaskTypes.Closed)}
      {_initByMaskType(MaskTypes.Marked)}
      {_initByMaskType(MaskTypes.MarkedWrongly)}
    </>
  );

  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(3);
  expect(buttons[0]).toHaveClass('closed');
  expect(buttons[1]).toHaveClass('marked');
  expect(buttons[2]).toHaveClass('markedWrongly');
});

test('Check cell type class names', async () => {
  render(
    <>
      {_initByCellType(CellTypes.Empty)}
      {_initByCellType(CellTypes.MineExploded)}
      {_initByCellType(CellTypes.Mine)}
      {_initByCellType(CellTypes.One)}
      {_initByCellType(CellTypes.Two)}
    </>
  );

  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(5);
  expect(buttons[0]).toHaveClass('open');
  expect(buttons[1]).toHaveClass('mineExploded');
  expect(buttons[2]).toHaveClass('mine');
  expect(buttons[3]).toHaveClass('hint1');
  expect(buttons[4]).toHaveClass('hint2');
});

test('Open cell callback called on click event', async () => {
  const x = 1,
    y = 2;
  const onCellOpen = jest.fn();

  render(
    <Cell
      x={x}
      y={y}
      gameStatus={'Progress'}
      cellType={CellTypes.Empty}
      maskType={MaskTypes.Closed}
      onCellOpen={onCellOpen}
      onCellMark={jest.fn()}
    />
  );

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  expect(onCellOpen).toHaveBeenCalledWith(x, y);
});

test('Mark cell callback called on context menu event', async () => {
  const x = 1,
    y = 2;
  const onCellMark = jest.fn();

  render(
    <Cell
      x={x}
      y={y}
      gameStatus={'Progress'}
      cellType={CellTypes.Empty}
      maskType={MaskTypes.Closed}
      onCellOpen={jest.fn()}
      onCellMark={onCellMark}
    />
  );

  const button = await screen.findByRole('button');
  await fireEvent.contextMenu(button);
  expect(onCellMark).toHaveBeenCalledWith(x, y);
});

test('Callbacks are not called for the finished game', async () => {
  const onCellOpen = jest.fn();
  const onCellMark = jest.fn();

  render(
    <Cell
      x={1}
      y={2}
      gameStatus={'Success'}
      cellType={CellTypes.Empty}
      maskType={MaskTypes.Closed}
      onCellOpen={onCellOpen}
      onCellMark={onCellMark}
    />
  );

  const button = await screen.findByRole('button');
  await userEvent.click(button);
  await fireEvent.contextMenu(button);
  expect(onCellMark).not.toBeCalled();
  expect(onCellMark).not.toBeCalled();
});
