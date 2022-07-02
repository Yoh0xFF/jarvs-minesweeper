import { Board, CellTypes, GameStatus, MaskTypes } from './types';
import { isOnBoard, steps } from './utils';

function _checkIsSuccess(board: Board): boolean {
  const { rows, cols, cellsGrid, cellsMask } = board;

  for (let i = 0; i < rows * cols; ++i) {
    const notDiscovered =
      cellsGrid[i] !== CellTypes.Mine &&
      (cellsMask[i] === MaskTypes.Closed || cellsMask[i] === MaskTypes.Marked);

    if (notDiscovered) return false;
  }

  for (let i = 0; i < rows * cols; ++i)
    if (cellsMask[i] === MaskTypes.Closed) cellsMask[i] = MaskTypes.Marked;

  board.bombCount = 0;

  return true;
}

function _boom(x: number, y: number, board: Board) {
  const { rows, cols, cellsGrid, cellsMask } = board;

  const pos = x * cols + y;
  cellsMask[pos] = MaskTypes.Open;
  cellsGrid[pos] = CellTypes.MineExploded;

  for (let i = 0; i < rows * cols; ++i) {
    if (cellsGrid[i] === CellTypes.Mine) {
      cellsMask[i] = MaskTypes.Open;
      continue;
    }

    if (cellsGrid[i] !== CellTypes.Mine && cellsMask[i] === MaskTypes.Marked) {
      cellsMask[i] = MaskTypes.MarkedWrongly;
      continue;
    }
  }
}

function _expand(x: number, y: number, board: Board) {
  const { cols, cellsGrid, cellsMask } = board;

  var queue = [[x, y]];
  const pos = x * cols + y;
  cellsMask[pos] = MaskTypes.Open;

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
        isOnBoard(nx, ny, board) && cellsMask[npos] === MaskTypes.Closed;

      if (open) {
        cellsMask[npos] = MaskTypes.Open;
        if (cellsGrid[npos] === CellTypes.Empty) queue.push([nx, ny]);
      }
    }
  }
}

function _open(x: number, y: number, board: Board) {
  const { cols, cellsMask } = board;

  const pos = x * cols + y;
  cellsMask[pos] = MaskTypes.Open;
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

    if (cellsMask[npos] === MaskTypes.Marked) {
      if (cellsGrid[npos] !== CellTypes.Mine) {
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

  if (maskValue === MaskTypes.Open) return;

  if (maskValue === MaskTypes.Closed) {
    cellsMask[pos] = MaskTypes.Marked;
    board.bombCount -= 1;
  } else {
    cellsMask[pos] = MaskTypes.Closed;
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
    case MaskTypes.Open:
      // If the users click opened cell,
      // we try to expand if all mines around it are marked.
      if (!_tryToExpand(x, y, newBoard)) return [newBoard, 'Fail'];
      return [newBoard, _checkIsSuccess(newBoard) ? 'Success' : 'Progress'];
    case MaskTypes.Marked:
    case MaskTypes.MarkedWrongly:
      // If the users click marked cell, we should do nothing.
      return [newBoard, 'Progress'];
  }

  switch (cellType) {
    case CellTypes.Mine:
      _boom(x, y, newBoard);
      return [newBoard, 'Fail'];
    case CellTypes.Empty:
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
