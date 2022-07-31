import {
  CellType,
  DifficultyLevel,
  GameStatus,
  MaskType,
} from 'game-logic/types';

export const difficultyLevel: DifficultyLevel = 'Beginner';

// Input
export const inputGrid: CellType[][] = [
  [0, 1, -1, 1, 0, 0, 0, 1, -1],
  [2, 3, 2, 1, 0, 0, 0, 1, 1],
  [-1, -1, 1, 0, 0, 0, 0, 0, 0],
  [2, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 2, -1, 2, 1, 2, -1],
  [0, 1, 1, 3, -1, 2, 1, -1, 2],
  [1, 2, -1, 2, 1, 1, 1, 1, 1],
  [1, -1, 2, 1, 0, 0, 0, 0, 0],
];
export const inputMask: MaskType[][] = [
  [0, 0, 1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
];

export const inputX = 5;
export const inputY = 7;

// Expected output
export const expectedStatus: GameStatus = 'Success';
export const expectedMask: MaskType[][] = [
  [0, 0, 2, 0, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 0, 0, 0, 2],
  [0, 0, 0, 0, 2, 0, 0, 2, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
];
