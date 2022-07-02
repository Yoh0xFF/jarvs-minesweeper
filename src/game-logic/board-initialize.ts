import { Board, CellType, CellTypes, MaskType, MaskTypes } from './types';
import { generateRandomInt, isOnBoard, steps } from './utils';

function _setMine(x: number, y: number, board: Board): boolean {
  const { cols, cellsGrid } = board;

  const pos = x * cols + y;

  // If already set then return
  if (cellsGrid[pos] === CellTypes.Mine) return false;

  // Set mine and update hints around it
  cellsGrid[pos] = CellTypes.Mine;

  // Update hints around the mine
  for (const step of steps) {
    const [i, j] = step;
    const nx = x + i;
    const ny = y + j;
    const npos = nx * cols + ny;

    const update =
      isOnBoard(nx, ny, board) && cellsGrid[npos] !== CellTypes.Mine;

    if (update) cellsGrid[npos] += 1;
  }

  return true;
}

export function generateNewBoard(
  rows: number,
  cols: number,
  bombCount: number
): Board {
  const cellsGrid = Array(rows * cols).fill(CellTypes.Empty) as Array<CellType>;
  const cellsMask = Array(rows * cols).fill(
    MaskTypes.Closed
  ) as Array<MaskType>;

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
