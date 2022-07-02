import { Board, DifficultyLevel } from './types';

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

export function generateRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function isOnBoard(x: number, y: number, board: Board): boolean {
  return x > -1 && x < board.rows && y > -1 && y < board.cols;
}
