import {
  Board,
  CellType,
  CellTypes,
  MaskType,
  MaskTypes,
} from 'game-logic/types';
import { generateRandomInt, isOnBoard, steps } from 'game-logic/utils';

function _setMine(x: number, y: number, board: Board): boolean {
  const { cellsGrid } = board;

  // If already set then return
  if (cellsGrid[x][y] === CellTypes.Mine) return false;

  // Set mine and update hints around it
  cellsGrid[x][y] = CellTypes.Mine;

  // Update hints around the mine
  _updateHints(x, y, board);

  return true;
}

function _updateHints(x: number, y: number, board: Board) {
  const { cellsGrid } = board;

  // Increment hints around the cell if it contains mine and decrement otherwise.
  const increment = cellsGrid[x][y] === CellTypes.Mine;
  const decrement = cellsGrid[x][y] !== CellTypes.Mine;

  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    const updateHint =
      isOnBoard(nx, ny, board) && cellsGrid[nx][ny] !== CellTypes.Mine;

    if (updateHint && increment) cellsGrid[nx][ny] += 1;
    if (updateHint && decrement && cellsGrid[nx][ny] > 0)
      cellsGrid[nx][ny] -= 1;
  }
}

function _countMines(x: number, y: number, board: Board): CellType {
  const { cellsGrid } = board;
  let count = CellTypes.Empty;

  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    const hasMine =
      isOnBoard(nx, ny, board) && cellsGrid[nx][ny] === CellTypes.Mine;

    if (hasMine) count += 1;
  }

  return count;
}

export function generateNewBoard(
  rows: number,
  cols: number,
  bombCount: number
): Board {
  const cellsGrid: Array<Array<CellType>> = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => CellTypes.Empty)
  );
  const cellsMask: Array<Array<MaskType>> = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => MaskTypes.Closed)
  );

  const board: Board = {
    rows,
    cols,
    bombCount,
    cellsGrid,
    cellsMask,
  };

  let count = 0;
  while (count < bombCount) {
    const x = generateRandomInt(rows);
    const y = generateRandomInt(cols);

    if (_setMine(x, y, board)) count += 1;
  }

  return board;
}

export function swapMine(x: number, y: number, board: Board) {
  const { rows, cols, cellsGrid } = board;

  if (cellsGrid[x][y] !== CellTypes.Mine) return;

  cellsGrid[x][y] = _countMines(x, y, board);
  _updateHints(x, y, board);

  while (true) {
    const nx = generateRandomInt(rows);
    const ny = generateRandomInt(cols);

    if (_setMine(nx, ny, board)) break;
  }
}
