import { Board, MapValueType, MaskValueType } from './types';
import { isOnBoard, steps } from './utils';

function _boom(x: number, y: number, board: Board) {
  const { n, m, boardMap, boardMask } = board;

  boardMap[x * n + y] = MapValueType.MineExploded;
  boardMask[x * n + y] = MaskValueType.Open;

  for (let i = 0; i < n * m; ++i) {
    if (boardMap[i] === MapValueType.Mine) {
      boardMask[i] = MaskValueType.Open;
      continue;
    }

    if (
      boardMap[i] !== MapValueType.Mine &&
      boardMask[i] === MaskValueType.Marked
    ) {
      boardMask[i] = MaskValueType.MarkedWrongly;
      continue;
    }
  }
}

function _expand(x: number, y: number, board: Board) {
  const { n, boardMap, boardMask } = board;

  var queue = [[x, y]];
  boardMask[x * n + y] = MaskValueType.Open;

  while (queue.length > 0) {
    const coordinates = queue.shift();
    if (!coordinates) continue;
    const [x, y] = coordinates;

    steps.forEach((step) => {
      const [i, j] = step;
      const x1 = x + i;
      const y1 = y + j;

      const open =
        isOnBoard(x1, y1, board) &&
        boardMask[x1 * n + y1] === MaskValueType.Closed;

      if (open && boardMap[x1 * n + y1] > MapValueType.Empty) {
        boardMask[x1 * n + y1] = MaskValueType.Open;
        return;
      }

      if (open) {
        boardMask[x1 * n + y1] = MaskValueType.Open;
        queue.push([x1, y1]);
        return;
      }
    });
  }
}

function _open(x: number, y: number, board: Board) {
  const { n, boardMask } = board;
  boardMask[x * n + y] = MaskValueType.Open;
}

export function updateBoard(x: number, y: number, board: Board): Board {
  const newBoard = {
    ...board,
    boardMap: [...board.boardMap],
    boardMask: [...board.boardMask],
  };
  const { n, boardMap } = newBoard;
  const value = boardMap[x * n + y];

  switch (value) {
    case MapValueType.Mine:
      _boom(x, y, board);
      break;
    case MapValueType.Empty:
      _expand(x, y, board);
      break;
    default:
      _open(x, y, board);
      break;
  }

  return newBoard;
}
