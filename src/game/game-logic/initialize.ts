import { Board, DifficultyLevel } from './types';

const boardConfigs = new Map<DifficultyLevel, Array<number>>([
  ['Beginner', [9, 9, 10]],
  ['Intermediate', [16, 16, 40]],
  ['Expert', [30, 16, 99]],
]);

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

function _getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function _updateHints(board: Board, x: number, y: number) {
  const N = board.length,
    M = board[0].length;

  directions.forEach((d) => {
    const [i, j] = d;

    const x1 = x + i,
      y1 = y + j;

    const valid =
      x1 > -1 && x1 < N && y1 > -1 && y1 < M && board[x1][y1] !== -1;

    if (valid) {
      board[x1][y1] += 1;
    }
  });
}

export default function generateNewGame(
  difficultyLevel: DifficultyLevel
): Board {
  const [rows, cols, bombCount] = boardConfigs.get(difficultyLevel) ?? [
    0, 0, 0,
  ];

  const board = Array(rows).fill(Array(cols).fill(0));

  let count = 0;
  while (count < bombCount) {
    const x = _getRandomInt(rows);
    const y = _getRandomInt(cols);

    if (board[x][y] === -1) {
      continue;
    }

    board[x][y] = -1;
    _updateHints(board, x, y);
  }

  return board;
}
