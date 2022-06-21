import { boardConfigs, directions } from './config';
import { Board, DifficultyLevel, TileState } from './types';

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
      x1 > -1 && x1 < N && y1 > -1 && y1 < M && board[x1][y1].value !== -1;

    if (valid) board[x1][y1].value += 1;
  });
}

export default function generateNewGame(
  difficultyLevel: DifficultyLevel
): Board {
  const [N, M, bombCount] = boardConfigs.get(difficultyLevel) ?? [0, 0, 0];

  const defaultTileState: TileState = { hidden: true, value: 0 };

  const board: Board = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => ({ ...defaultTileState }))
  );

  let count = 0;
  while (count < bombCount) {
    const x = _getRandomInt(N);
    const y = _getRandomInt(M);
    console.log(x, y, count, bombCount, board[x][y].value);

    if (board[x][y].value === -1) continue;

    board[x][y].value = -1;
    _updateHints(board, x, y);
    console.table(board);
    count += 1;
  }

  return board;
}
