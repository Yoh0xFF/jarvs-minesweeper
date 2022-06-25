import { Board, CellType, MaskType } from './types';
import { isOnBoard, steps } from './utils';

function _boom(x: number, y: number, board: Board) {
  const { rows, cols, cellsGrid, cellsMask } = board;

  cellsGrid[x * rows + y] = CellType.MineExploded;
  cellsMask[x * rows + y] = MaskType.Open;

  for (let i = 0; i < rows * cols; ++i) {
    if (cellsGrid[i] === CellType.Mine) {
      cellsMask[i] = MaskType.Open;
      continue;
    }

    if (cellsGrid[i] !== CellType.Mine && cellsMask[i] === MaskType.Marked) {
      cellsMask[i] = MaskType.MarkedWrongly;
      continue;
    }
  }
}

function _expand(x: number, y: number, board: Board) {
  const { rows, cellsGrid, cellsMask } = board;

  var queue = [[x, y]];
  cellsMask[x * rows + y] = MaskType.Open;

  while (queue.length > 0) {
    const coordinates = queue.shift();
    if (!coordinates) {
      continue;
    }

    const [x, y] = coordinates;

    steps.forEach((step) => {
      const [i, j] = step;
      const x1 = x + i;
      const y1 = y + j;

      const open =
        isOnBoard(x1, y1, board) &&
        cellsMask[x1 * rows + y1] === MaskType.Closed;

      if (open && cellsGrid[x1 * rows + y1] > CellType.Empty) {
        cellsMask[x1 * rows + y1] = MaskType.Open;
        return;
      }

      if (open && cellsGrid[x1 * rows + y1] === CellType.Empty) {
        cellsMask[x1 * rows + y1] = MaskType.Open;
        queue.push([x1, y1]);
        return;
      }
    });
  }
}

function _open(x: number, y: number, board: Board) {
  const { rows, cellsMask } = board;

  cellsMask[x * rows + y] = MaskType.Open;
}

function _mark(x: number, y: number, board: Board) {
  const { rows, cellsMask } = board;
  const maskValue = cellsMask[x * rows + y];

  if (maskValue === MaskType.Open) {
    return;
  }

  if (maskValue === MaskType.Closed) {
    cellsMask[x * rows + y] = MaskType.Marked;
    return;
  }

  if (maskValue === MaskType.Marked) {
    cellsMask[x * rows + y] = MaskType.Closed;
    return;
  }
}

export function updateBoard(
  action: 'click' | 'mark',
  x: number,
  y: number,
  board: Board
): Board {
  const newBoard = {
    ...board,
    cellsGrid: [...board.cellsGrid],
    cellsMask: [...board.cellsMask],
  };

  const { rows, cellsGrid } = newBoard;
  const value = cellsGrid[x * rows + y];

  if (action === 'mark') {
    _mark(x, y, newBoard);
    return newBoard;
  }

  switch (value) {
    case CellType.Mine:
      _boom(x, y, newBoard);
      break;
    case CellType.Empty:
      _expand(x, y, newBoard);
      break;
    default:
      _open(x, y, newBoard);
      break;
  }

  return newBoard;
}
