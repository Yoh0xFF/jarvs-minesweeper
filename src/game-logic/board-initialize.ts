import { Board, CellType, MaskType } from './types';
import { generateRandomInt, isOnBoard, steps } from './utils';

function _updateHints(x: number, y: number, board: Board) {
  const { rows, cellsGrid } = board;

  steps.forEach((step) => {
    const [i, j] = step;
    const x1 = x + i;
    const y1 = y + j;

    const update =
      isOnBoard(x1, y1, board) && cellsGrid[x1 * rows + y1] !== CellType.Mine;

    if (update) {
      cellsGrid[x1 * rows + y1] += 1;
    }
  });
}

export function generateNewBoard(
  rows: number,
  cols: number,
  bombCount: number
): Board {
  const boardMap = Array(rows * cols).fill(CellType.Empty) as Array<CellType>;
  const boardMask = Array(rows * cols).fill(MaskType.Closed) as Array<MaskType>;

  const board: Board = {
    rows,
    cols,
    bombCount,
    cellsGrid: boardMap,
    cellsMask: boardMask,
  };

  let count = 0;
  while (count < bombCount) {
    const x = generateRandomInt(rows);
    const y = generateRandomInt(cols);

    if (boardMap[x * rows + y] === CellType.Mine) {
      continue;
    }

    boardMap[x * rows + y] = CellType.Mine;
    _updateHints(x, y, board);

    count += 1;
  }

  return board;
}
