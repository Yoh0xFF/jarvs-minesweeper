import { Board, CellTypes, GameStatus, MaskTypes } from 'game-logic/types';
import { isOnBoard, steps } from 'game-logic/utils';

function _checkIsSuccess(board: Board): boolean {
  const { rows, cols, cellsGrid, cellsMask } = board;

  for (let i = 0; i < rows * cols; ++i) {
    const isWithoutMine = cellsGrid[i] !== CellTypes.Mine;
    const isClosedOrMarked =
      cellsMask[i] === MaskTypes.Closed || cellsMask[i] === MaskTypes.Marked;

    // Users win the game when they open every cell without mine.
    if (isWithoutMine && isClosedOrMarked) return false;
  }

  // When the users win the game, mark all cells with mine.
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
    // When the users lose the game, open all cells with mine.
    if (cellsGrid[i] === CellTypes.Mine) {
      cellsMask[i] = MaskTypes.Open;
      continue;
    }

    // When the users lose the game, point out all cells which are marked wrongly.
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

  // Expand all the empty cells around the opened empty cell.
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
        // Continue expanding only if the neighbor cell is empty.
        if (cellsGrid[npos] === CellTypes.Empty) queue.push([nx, ny]);
      }
    }
  }
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

function _open(x: number, y: number, board: Board) {
  const { cols, cellsMask } = board;

  const pos = x * cols + y;
  cellsMask[pos] = MaskTypes.Open;
}

function _mark(x: number, y: number, board: Board) {
  const { cols, cellsMask } = board;

  const pos = x * cols + y;
  const maskValue = cellsMask[pos];

  if (maskValue === MaskTypes.Open) return;

  // If closed, then mark, and unmark otherwise.
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
      // If the users click the cell with mine, finish the game.
      _boom(x, y, newBoard);
      return [newBoard, 'Fail'];
    case CellTypes.Empty:
      // If the users click an empty cell, expand all the blank cells around it.
      _expand(x, y, newBoard);
      return [newBoard, 'Progress'];
    default:
      // If the users click the cell with a hint, open it.
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
