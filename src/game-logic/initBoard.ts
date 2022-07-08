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
  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    const update =
      isOnBoard(nx, ny, board) && cellsGrid[nx][ny] !== CellTypes.Mine;

    if (update) cellsGrid[nx][ny] += 1;
  }

  return true;
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
