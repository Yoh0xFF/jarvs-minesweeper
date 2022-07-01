import { Board, CellType, GameStatus, MaskType } from './types';
import { isOnBoard, steps } from './utils';

function _checkIsSuccess(board: Board): boolean {
  const { rows, cols, cellsGrid, cellsMask } = board;

  for (let i = 0; i < rows * cols; ++i) {
    const notDiscovered =
      cellsGrid[i] !== CellType.Mine &&
      [MaskType.Closed, MaskType.Marked].includes(cellsMask[i]);

    if (notDiscovered) return false;
  }

  for (let i = 0; i < rows * cols; ++i)
    if (cellsMask[i] === MaskType.Closed) cellsMask[i] = MaskType.Marked;

  board.bombCount = 0;

  return true;
}

function _boom(x: number, y: number, board: Board) {
  const { rows, cols, cellsGrid, cellsMask } = board;

  const pos = x * cols + y;
  cellsMask[pos] = MaskType.Open;
  cellsGrid[pos] = CellType.MineExploded;

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
  const { cols, cellsGrid, cellsMask } = board;

  var queue = [[x, y]];
  const pos = x * cols + y;
  cellsMask[pos] = MaskType.Open;

  while (queue.length > 0) {
    const coordinates = queue.shift();
    if (!coordinates) continue;

    const [x, y] = coordinates;

    for (const step of steps) {
      const [i, j] = step;
      const nx = x + i;
      const ny = y + j;
      const npos = nx * cols + ny;

      const open =
        isOnBoard(nx, ny, board) && cellsMask[npos] === MaskType.Closed;

      if (open) {
        cellsMask[npos] = MaskType.Open;
        if (cellsGrid[npos] === CellType.Empty) queue.push([nx, ny]);
      }
    }
  }
}

function _open(x: number, y: number, board: Board) {
  const { cols, cellsMask } = board;

  const pos = x * cols + y;
  cellsMask[pos] = MaskType.Open;
}

function _tryToExpand(x: number, y: number, board: Board): boolean {
  const { cols, cellsGrid, cellsMask } = board;

  const pos = x * cols + y;
  let count = 0;

  // Check neighbors, if some of them is marked wrongly then explode,
  // if all mines are marked correctly then expand.
  for (const step of steps) {
    const [i, j] = step;
    const nx = x + i;
    const ny = y + j;
    const npos = nx * cols + ny;

    if (!isOnBoard(nx, ny, board)) {
      continue;
    }

    if (cellsMask[npos] === MaskType.Marked) {
      if (cellsGrid[npos] !== CellType.Mine) {
        _boom(nx, ny, board);
        return false;
      } else {
        count += 1;
      }
    }
  }

  if (count < cellsGrid[pos]) return true;

  _expand(x, y, board);
  return true;
}

function _mark(x: number, y: number, board: Board) {
  const { cols, cellsMask } = board;

  const pos = x * cols + y;
  const maskValue = cellsMask[pos];

  if (maskValue === MaskType.Open) return;

  if (maskValue === MaskType.Closed) {
    cellsMask[pos] = MaskType.Marked;
    board.bombCount -= 1;
  } else {
    cellsMask[pos] = MaskType.Closed;
    board.bombCount += 1;
  }
}

export function openCell(
  x: number,
  y: number,
  board: Board
): [Board, GameStatus] {
  const newBoard = {
    ...board,
    cellsGrid: [...board.cellsGrid],
    cellsMask: [...board.cellsMask],
  };

  const { cols, cellsGrid, cellsMask } = newBoard;
  const pos = x * cols + y;
  const cellType = cellsGrid[pos];
  const maskType = cellsMask[pos];

  switch (maskType) {
    case MaskType.Open:
      if (!_tryToExpand(x, y, newBoard)) return [newBoard, 'Fail'];
      return [newBoard, _checkIsSuccess(newBoard) ? 'Success' : 'Progress'];
    case MaskType.Marked:
    case MaskType.MarkedWrongly:
      return [newBoard, 'Progress'];
  }

  switch (cellType) {
    case CellType.Mine:
      _boom(x, y, newBoard);
      return [newBoard, 'Fail'];
    case CellType.Empty:
      _expand(x, y, newBoard);
      return [newBoard, 'Progress'];
    default:
      _open(x, y, newBoard);
      return [newBoard, _checkIsSuccess(newBoard) ? 'Success' : 'Progress'];
  }
}

export function markCell(x: number, y: number, board: Board): Board {
  const newBoard = {
    ...board,
    cellsGrid: [...board.cellsGrid],
    cellsMask: [...board.cellsMask],
  };

  _mark(x, y, newBoard);

  return newBoard;
}
