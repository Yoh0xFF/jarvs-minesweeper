import { swapMine } from 'game-logic/initBoard';
import { Board, CellTypes, GameStatus, MaskTypes } from 'game-logic/types';
import { isOnBoard, steps } from 'game-logic/utils';

function _checkIsSuccess(board: Board): boolean {
  const { rows, cols, cellsGrid, cellsMask } = board;

  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      const isWithoutMine = cellsGrid[x][y] !== CellTypes.Mine;
      const isClosedOrMarked =
        cellsMask[x][y] === MaskTypes.Closed ||
        cellsMask[x][y] === MaskTypes.Marked;

      // Users win the game when they open every cell without mine.
      if (isWithoutMine && isClosedOrMarked) return false;
    }
  }

  // When the users win the game, mark all cells with mine.
  for (let x = 0; x < rows; ++x)
    for (let y = 0; y < cols; ++y)
      if (cellsMask[x][y] === MaskTypes.Closed)
        cellsMask[x][y] = MaskTypes.Marked;

  board.bombCount = 0;

  return true;
}

function _boom(x: number, y: number, board: Board) {
  const { rows, cols, cellsGrid, cellsMask } = board;

  cellsMask[x][y] = MaskTypes.Open;
  cellsGrid[x][y] = CellTypes.MineExploded;

  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      // When the users lose the game, open all cells with mine.
      if (cellsGrid[x][y] === CellTypes.Mine) {
        cellsMask[x][y] = MaskTypes.Open;
        continue;
      }

      // When the users lose the game, point out all cells which are marked wrongly.
      if (
        cellsGrid[x][y] !== CellTypes.Mine &&
        cellsMask[x][y] === MaskTypes.Marked
      ) {
        cellsMask[x][y] = MaskTypes.MarkedWrongly;
        continue;
      }
    }
  }
}

function _expand(x: number, y: number, board: Board) {
  const { cellsGrid, cellsMask } = board;

  var queue = [[x, y]];
  cellsMask[x][y] = MaskTypes.Open;

  // Expand all the empty cells around the opened empty cell.
  while (queue.length > 0) {
    const coordinates = queue.shift();
    if (!coordinates) continue;

    const [x, y] = coordinates;

    for (const step of steps) {
      const [i, j] = step;
      const [nx, ny] = [x + i, y + j];

      const open =
        isOnBoard(nx, ny, board) && cellsMask[nx][ny] === MaskTypes.Closed;

      if (open) {
        cellsMask[nx][ny] = MaskTypes.Open;
        // Continue expanding only if the neighbor cell is empty.
        if (cellsGrid[nx][ny] === CellTypes.Empty) queue.push([nx, ny]);
      }
    }
  }
}

function _tryToExpand(x: number, y: number, board: Board): boolean {
  const { cellsGrid, cellsMask } = board;

  let count = 0;

  // Check neighbors, if some of them is marked wrongly then explode,
  // if all mines are marked correctly then expand.
  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    if (!isOnBoard(nx, ny, board)) continue;

    if (cellsMask[nx][ny] === MaskTypes.Marked)
      if (cellsGrid[nx][ny] !== CellTypes.Mine) {
        _boom(nx, ny, board);
        return false;
      } else count += 1;
  }

  if (count < cellsGrid[x][y]) return true;

  _expand(x, y, board);
  return true;
}

function _open(x: number, y: number, board: Board) {
  const { cellsGrid, cellsMask } = board;

  cellsMask[x][y] = MaskTypes.Open;

  // If the users click an empty cell, expand all the blank cells around it.
  if (cellsGrid[x][y] === CellTypes.Empty) _expand(x, y, board);
}

function _mark(x: number, y: number, board: Board) {
  const { cellsMask } = board;

  const maskValue = cellsMask[x][y];

  if (maskValue === MaskTypes.Open) return;

  // If closed, then mark, and unmark otherwise.
  if (maskValue === MaskTypes.Closed) {
    cellsMask[x][y] = MaskTypes.Marked;
    board.bombCount -= 1;
  } else {
    cellsMask[x][y] = MaskTypes.Closed;
    board.bombCount += 1;
  }
}

export function openCell(
  x: number,
  y: number,
  board: Board,
  isFirstOpen: boolean
): [Board, GameStatus] {
  const { rows, cellsGrid, cellsMask } = board;

  const newBoard = {
    ...board,
    cellsGrid: Array.from({ length: rows }, (_, x) => [...cellsGrid[x]]),
    cellsMask: Array.from({ length: rows }, (_, x) => [...cellsMask[x]]),
  };

  const cellType = cellsGrid[x][y];
  const maskType = cellsMask[x][y];

  // If the users click opened cell,
  // we try to expand if all mines around it are marked.
  if (maskType === MaskTypes.Open) {
    if (!_tryToExpand(x, y, newBoard)) return [newBoard, 'Fail'];
    return [newBoard, _checkIsSuccess(newBoard) ? 'Success' : 'Progress'];
  }

  // If the users click marked cell, we should do nothing.
  if (maskType === MaskTypes.Marked || maskType === MaskTypes.MarkedWrongly) {
    return [newBoard, 'Progress'];
  }

  // If the users click the cell with mine, finish the game.
  if (cellType === CellTypes.Mine) {
    // First open should always be successful.
    // If cell contains mine, we need to swap it.
    if (isFirstOpen) {
      swapMine(x, y, newBoard);
      _open(x, y, newBoard);
      return [newBoard, 'Progress'];
    }

    _boom(x, y, newBoard);
    return [newBoard, 'Fail'];
  }

  // If the users click the cell with a hint, open it.
  _open(x, y, newBoard);
  return [newBoard, _checkIsSuccess(newBoard) ? 'Success' : 'Progress'];
}

export function markCell(x: number, y: number, board: Board): Board {
  const { rows, cellsGrid, cellsMask } = board;

  const newBoard = {
    ...board,
    cellsGrid: Array.from({ length: rows }, (_, x) => [...cellsGrid[x]]),
    cellsMask: Array.from({ length: rows }, (_, x) => [...cellsMask[x]]),
  };

  _mark(x, y, newBoard);

  return newBoard;
}
