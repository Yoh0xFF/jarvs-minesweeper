import { swapMine } from 'game-logic/gameStateInit';
import { Board, CellTypes, GameStatus, MaskTypes } from 'game-logic/types';
import { copyBoard, isOnBoard, steps } from 'game-logic/utils';

function _checkIsSuccess(board: Board): boolean {
  const { rows, cols, grid, mask } = board;

  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      const isWithoutMine = grid[x][y] !== CellTypes.Mine;
      const isClosedOrMarked =
        mask[x][y] === MaskTypes.Closed || mask[x][y] === MaskTypes.Marked;

      // Users win the game when they open every cell without mine.
      if (isWithoutMine && isClosedOrMarked) return false;
    }
  }

  // When the users win the game, mark all cells with mine.
  for (let x = 0; x < rows; ++x)
    for (let y = 0; y < cols; ++y)
      if (mask[x][y] === MaskTypes.Closed) mask[x][y] = MaskTypes.Marked;

  board.bombCount = 0;

  return true;
}

function _fail(x: number, y: number, board: Board) {
  const { rows, cols, grid, mask } = board;

  mask[x][y] = MaskTypes.Open;
  grid[x][y] = CellTypes.MineExploded;

  for (let x = 0; x < rows; ++x) {
    for (let y = 0; y < cols; ++y) {
      // When the users lose the game, open all cells with mine.
      if (grid[x][y] === CellTypes.Mine) {
        mask[x][y] = MaskTypes.Open;
        continue;
      }

      // When the users lose the game, point out all cells which are marked wrongly.
      if (grid[x][y] !== CellTypes.Mine && mask[x][y] === MaskTypes.Marked) {
        mask[x][y] = MaskTypes.MarkedWrongly;
        continue;
      }
    }
  }
}

function _expand(x: number, y: number, board: Board) {
  const { grid, mask } = board;

  var queue = [[x, y]];
  mask[x][y] = MaskTypes.Open;

  // Expand all the empty cells around the opened empty cell.
  while (queue.length > 0) {
    const coordinates = queue.shift();
    if (!coordinates) continue;

    const [x, y] = coordinates;

    for (const step of steps) {
      const [i, j] = step;
      const [nx, ny] = [x + i, y + j];

      const open =
        isOnBoard(nx, ny, board) && mask[nx][ny] === MaskTypes.Closed;

      if (open) {
        mask[nx][ny] = MaskTypes.Open;
        // Continue expanding only if the neighbor cell is empty.
        if (grid[nx][ny] === CellTypes.Empty) queue.push([nx, ny]);
      }
    }
  }
}

function _tryToExpand(x: number, y: number, board: Board): boolean {
  const { grid, mask } = board;

  let count = 0;

  // Check neighbors, if some of them is marked wrongly then explode,
  // if all mines are marked correctly then expand.
  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    if (!isOnBoard(nx, ny, board)) continue;

    if (mask[nx][ny] === MaskTypes.Marked)
      if (grid[nx][ny] !== CellTypes.Mine) {
        _fail(nx, ny, board);
        return false;
      } else count += 1;
  }

  if (count < grid[x][y]) return true;

  _expand(x, y, board);
  return true;
}

function _open(x: number, y: number, board: Board) {
  const { grid, mask } = board;

  mask[x][y] = MaskTypes.Open;

  // If the users click an empty cell, expand all the blank cells around it.
  if (grid[x][y] === CellTypes.Empty) _expand(x, y, board);
}

function _mark(x: number, y: number, board: Board) {
  const { mask } = board;

  const maskValue = mask[x][y];

  if (maskValue === MaskTypes.Open) return;

  // If closed, then mark, and unmark otherwise.
  if (maskValue === MaskTypes.Closed) {
    mask[x][y] = MaskTypes.Marked;
    board.bombCount -= 1;
  } else {
    mask[x][y] = MaskTypes.Closed;
    board.bombCount += 1;
  }
}

export function openCell(
  x: number,
  y: number,
  board: Board,
  isFirstOpen: boolean
): [Board, GameStatus] {
  const newBoard = copyBoard(board);

  const { grid, mask } = newBoard;
  const cellType = grid[x][y];
  const maskType = mask[x][y];

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

    _fail(x, y, newBoard);
    return [newBoard, 'Fail'];
  }

  // If the users click the cell with a hint, open it.
  _open(x, y, newBoard);
  return [newBoard, _checkIsSuccess(newBoard) ? 'Success' : 'Progress'];
}

export function markCell(x: number, y: number, board: Board): Board {
  const newBoard = copyBoard(board);

  _mark(x, y, newBoard);

  return newBoard;
}
