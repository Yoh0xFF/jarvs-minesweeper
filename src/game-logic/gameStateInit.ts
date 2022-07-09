import { Board, CellType, CellTypes, DifficultyLevel } from 'game-logic/types';
import {
  boardConfigs,
  createBoard,
  generateRandomInt,
  isOnBoard,
  steps,
} from 'game-logic/utils';

function _updateHints(x: number, y: number, board: Board) {
  const { grid } = board;

  // Increment hints around the cell if it contains mine and decrement otherwise.
  const increment = grid[x][y] === CellTypes.Mine;
  const decrement = grid[x][y] !== CellTypes.Mine;

  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    const updateHint =
      isOnBoard(nx, ny, board) && grid[nx][ny] !== CellTypes.Mine;

    if (updateHint && increment) grid[nx][ny] += 1;
    if (updateHint && decrement && grid[nx][ny] > 0) grid[nx][ny] -= 1;
  }
}

function _countMines(x: number, y: number, board: Board): CellType {
  const { grid } = board;
  let count = CellTypes.Empty;

  for (const step of steps) {
    const [i, j] = step;
    const [nx, ny] = [x + i, y + j];

    const hasMine = isOnBoard(nx, ny, board) && grid[nx][ny] === CellTypes.Mine;

    if (hasMine) count += 1;
  }

  return count;
}

function _setMine(x: number, y: number, board: Board): boolean {
  const { grid } = board;

  // If already set then return
  if (grid[x][y] === CellTypes.Mine) return false;

  // Set mine and update hints around it
  grid[x][y] = CellTypes.Mine;

  // Update hints around the mine
  _updateHints(x, y, board);

  return true;
}

export function generateNewBoard(difficultyLevel: DifficultyLevel): Board {
  const config = boardConfigs.get(difficultyLevel);
  if (!config)
    throw new Error(
      `Config not found for the difficulty level: ${difficultyLevel}`
    );
  const [rows, cols, bombCount] = config;

  const board = createBoard(rows, cols, bombCount);

  let count = 0;
  while (count < bombCount) {
    const x = generateRandomInt(rows);
    const y = generateRandomInt(cols);

    if (_setMine(x, y, board)) count += 1;
  }

  return board;
}

export function swapMine(x: number, y: number, board: Board) {
  const { rows, cols, grid } = board;

  if (grid[x][y] !== CellTypes.Mine) return;

  grid[x][y] = _countMines(x, y, board);
  _updateHints(x, y, board);

  while (true) {
    const nx = generateRandomInt(rows);
    const ny = generateRandomInt(cols);

    if (_setMine(nx, ny, board)) break;
  }
}
