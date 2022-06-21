import { Board, BoardMap, BoardMask } from './types';
import { generateRandomInt, isOnBoard, steps } from './utils';

function _updateHints(x: number, y: number, board: Board) {
  const { n, boardMap } = board;

  steps.forEach((step) => {
    const [i, j] = step;
    const x1 = x + i;
    const y1 = y + j;

    const update = isOnBoard(x1, y1, board) && boardMap[x1 * n + y1] !== -1;
    if (update) boardMap[x1 * n + y1] += 1;
  });
}

export function generateNewBoard(
  n: number,
  m: number,
  bombCount: number
): Board {
  const boardMap: BoardMap = Array(n * m).fill(0);
  const boardMask: BoardMask = Array(n * m).fill(false);

  const board: Board = {
    n,
    m,
    bombCount,
    boardMap,
    boardMask,
  };

  let count = 0;
  while (count < bombCount) {
    const x = generateRandomInt(n);
    const y = generateRandomInt(m);

    if (boardMap[x * n + y] === -1) continue;

    boardMap[x * n + y] = -1;
    _updateHints(x, y, board);

    count += 1;
  }

  return board;
}
