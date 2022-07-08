import {
  Board,
  CellType,
  CellTypes,
  MaskType,
  MaskTypes,
} from 'game-logic/types';
import { generateRandomInt, isOnBoard, steps } from 'game-logic/utils';

function _setMine(x: number, y: number, board: Board): boolean {
  const { grid } = board;

  // If already set then return
  if (grid[x][y] === CellTypes.Mine) return false;

  // Set mine and update hints around it
  grid[x][y] = CellTypes.Mine;

  // Update hints around the mine
  _updateHints(x, y, board);

  return true;
}

function _updateHints(x: number, y: number, board: Board) {
  const { grid } = board;

  // Increment hints around the cell if it contains mine and decrement otherwise.
  const increment = grid[x][y] === CellTypes.Mine;
  const decrement = grid[x][y] !== CellTypes.Mine;

  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    const updateHint =
      isOnBoard(nx, ny, board) && grid[nx][ny] !== CellTypes.Mine;

    if (updateHint && increment) grid[nx][ny] += 1;
    if (updateHint && decrement && grid[nx][ny] > 0) grid[nx][ny] -= 1;
  }
}

function _countMines(x: number, y: number, board: Board): CellType {
  const { grid } = board;
  let count = CellTypes.Empty;

  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    const hasMine = isOnBoard(nx, ny, board) && grid[nx][ny] === CellTypes.Mine;

    if (hasMine) count += 1;
  }

  return count;
}

export function generateNewBoard(
  rows: number,
  cols: number,
  bombCount: number
): Board {
  const grid: Array<Array<CellType>> = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => CellTypes.Empty)
  );
  const mask: Array<Array<MaskType>> = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => MaskTypes.Closed)
  );

  const board: Board = {
    rows,
    cols,
    bombCount,
    grid,
    mask,
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
  const { rows, cols, grid } = board;

  if (grid[x][y] !== CellTypes.Mine) return;

  grid[x][y] = _countMines(x, y, board);
  _updateHints(x, y, board);

  while (true) {
    const nx = generateRandomInt(rows);
    const ny = generateRandomInt(cols);

    if (_setMine(nx, ny, board)) break;
  }
}
