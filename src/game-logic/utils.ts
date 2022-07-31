import {
  Board,
  CellType,
  CellTypes,
  DifficultyLevel,
  MaskType,
  MaskTypes,
} from 'game-logic/types';

export const boardConfigs = new Map<DifficultyLevel, [number, number, number]>([
  ['Beginner', [9, 9, 10]],
  ['Intermediate', [16, 16, 40]],
  ['Expert', [16, 30, 99]],
]);

export const steps = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];

export function createBoard(
  rows: number,
  cols: number,
  mineCount: number
): Board {
  const grid: CellType[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => CellTypes.Empty)
  );
  const mask: MaskType[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => MaskTypes.Closed)
  );

  const board: Board = {
    rows,
    cols,
    mineCount: mineCount,
    grid,
    mask,
  };

  return board;
}

export function copyBoard(board: Board): Board {
  const { rows, grid, mask } = board;

  const newBoard = {
    ...board,
    grid: Array.from({ length: rows }, (_, x) => [...grid[x]]),
    mask: Array.from({ length: rows }, (_, x) => [...mask[x]]),
  };

  return newBoard;
}

export function generateRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function isOnBoard(x: number, y: number, board: Board): boolean {
  return x > -1 && x < board.rows && y > -1 && y < board.cols;
}
