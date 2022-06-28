import { Board, CellType, MaskType } from './types';
import { generateRandomInt, isOnBoard, steps } from './utils';

function _setMine(x: number, y: number, board: Board): boolean {
  const { rows, cellsGrid } = board;

  const pos = x * rows + y;

  // If already set then return
  if (cellsGrid[pos] === CellType.Mine) {
    return false;
  }

  // Set mine and update hints around it
  cellsGrid[pos] = CellType.Mine;

  steps.forEach((step) => {
    const [i, j] = step;
    const nx = x + i;
    const ny = y + j;
    const npos = nx * rows + ny;

    const update =
      isOnBoard(nx, ny, board) && cellsGrid[npos] !== CellType.Mine;

    if (update) {
      cellsGrid[npos] += 1;
    }
  });

  return true;
}

export function generateNewBoard(
  rows: number,
  cols: number,
  bombCount: number
): Board {
  const cellsGrid = Array(rows * cols).fill(CellType.Empty) as Array<CellType>;
  const cellsMask = Array(rows * cols).fill(MaskType.Closed) as Array<MaskType>;

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

    if (_setMine(x, y, board)) {
      count += 1;
    }
  }

  return board;
}
