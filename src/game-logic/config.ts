import { DifficultyLevel } from './types';

export const boardConfigs = new Map<DifficultyLevel, Array<number>>([
  ['Beginner', [9, 9, 10]],
  ['Intermediate', [16, 16, 40]],
  ['Expert', [30, 16, 99]],
]);

export const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
];
