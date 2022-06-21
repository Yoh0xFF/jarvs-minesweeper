import { Board } from './types';
import { isOnBoard, steps } from './utils';

function _boom(board: Board) {
  const { n, m, boardMask } = board;

  for (let i = 0; i < n * m; ++i) {
    boardMask[i] = false;
  }
}

function _expand(x: number, y: number, board: Board) {
  const { n, boardMap, boardMask } = board;

  var queue = [[x, y]];

  while (queue.length > 0) {
    const coordinates = queue.shift();
    if (!coordinates) continue;

    const [x, y] = coordinates;
    boardMask[x * n + y] = false;

    steps.forEach((step) => {
      const [i, j] = step;
      const x1 = x + i;
      const y1 = y + j;

      const addToQueue =
        isOnBoard(x1, y1, board) &&
        boardMask[x1 * n + y1] &&
        boardMap[x1 * n + y1] === 0;
      if (addToQueue) queue.push([x1, y1]);
    });
  }
}

function _open() {
  // TODO
}

export function updateBoard(x: number, y: number, board: Board): Board {
  const { n, boardMap } = board;
  const value = boardMap[x * n + y];

  switch (value) {
    case -1:
      _boom(board);
      break;
    case 0:
      _expand(x, y, board);
      break;
    default:
      _open();
      break;
  }

  return board;
}
