import { Board } from './types';

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
