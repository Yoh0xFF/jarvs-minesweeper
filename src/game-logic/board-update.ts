import { directions } from './config';
import { Board } from './types';

function _boom(board: Board, x: number, y: number) {
  board.forEach((row) => row.forEach((tile) => (tile.hidden = false)));
}

function _expand(board: Board, x: number, y: number) {
  const N = board.length;
  const M = board[0].length;
  var queue = [board[x][y]];

  while (queue.length > 0) {
    const tile = queue.shift();
    if (!tile) continue;
    tile.hidden = false;

    directions.forEach((d) => {
      const [i, j] = d;

      const x1 = x + i,
        y1 = y + j;

      const valid =
        x1 > -1 && x1 < N && y1 > -1 && y1 < M && board[x1][y1].value === 0;

      if (valid) {
        queue.push(board[x1][y1]);
      }
    });
  }
}

function _open() {
  // TODO
}

export default function updateGame(board: Board, x: number, y: number): Board {
  const { value } = board[x][y];

  switch (value) {
    case -1:
      _boom(board, x, y);
      break;
    case 0:
      _expand(board, x, y);
      break;
    default:
      _open();
      break;
  }

  return board;
}
