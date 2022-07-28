import { generateNewBoard, swapMine } from 'game-logic/gameStateInit';
import { Board, CellTypes, DifficultyLevel, MaskTypes } from 'game-logic/types';
import { boardConfigs, isOnBoard, steps } from 'game-logic/utils';

function _validateBoardMineCount(board: Board) {
  const { grid, mineCount } = board;

  let counter = 0;
  for (const row of grid)
    for (const el of row) if (el === CellTypes.Mine) counter += 1;

  expect(mineCount).toBe(counter);
}

function _validateBoardHints(board: Board) {
  const { rows, cols, grid } = board;

  for (let x = 0; x < rows; ++x)
    for (let y = 0; y < cols; ++y) {
      if (grid[x][y] === CellTypes.Mine) continue;

      let counter = 0;
      for (const step of steps) {
        const [i, j] = step;
        const [nx, ny] = [x + i, y + j];
        if (isOnBoard(nx, ny, board) && grid[nx][ny] === CellTypes.Mine)
          counter += 1;
      }

      expect(grid[x][y]).toBe(counter);
    }
}

function _validateBoardMask(board: Board) {
  const { mask } = board;

  for (const row of mask)
    for (const el of row) expect(el).toBe(MaskTypes.Closed);
}

function _validateBoard(board: Board, difficultyLevel: DifficultyLevel) {
  const [rows, cols, mineCount] = boardConfigs.get(difficultyLevel) ?? [
    0, 0, 0,
  ];

  expect(board.rows).toBe(rows);
  expect(board.cols).toBe(cols);
  expect(board.mineCount).toBe(mineCount);

  _validateBoardMineCount(board);
  _validateBoardHints(board);
  _validateBoardMask(board);
}

test('Board initialized with difficulty level beginner is correct', () => {
  const difficultyLevel = 'Beginner';
  const board = generateNewBoard(difficultyLevel);
  _validateBoard(board, difficultyLevel);
});

test('Board initialized with difficulty level intermediate is correct', () => {
  const difficultyLevel = 'Intermediate';
  const board = generateNewBoard(difficultyLevel);
  _validateBoard(board, difficultyLevel);
});

test('Board initialized with difficulty level expert is correct', () => {
  const difficultyLevel = 'Expert';
  const board = generateNewBoard(difficultyLevel);
  _validateBoard(board, difficultyLevel);
});

test('Board generated after swap mine is correct', () => {
  const difficultyLevel = 'Beginner';
  const board = generateNewBoard(difficultyLevel);
  const { rows, cols, grid } = board;

  let x = 0;
  let y = 0;
  let stop = false;
  for (x = 0; x < rows && !stop; ++x)
    for (y = 0; y < cols && !stop; ++y) stop = grid[x][y] === CellTypes.Mine;

  const newBoard = swapMine(x, y, board);
  const { grid: newGrid } = newBoard;

  expect(newGrid[x][y]).not.toBe(CellTypes.Mine);
  _validateBoard(newBoard, difficultyLevel);
});
