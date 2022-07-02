// Game difficulty levels
export const DifficultyLevels = ['Beginner', 'Intermediate', 'Expert'] as const;
export type DifficultyLevel = typeof DifficultyLevels[number];

// Game progress statuses
export const GameStatuses = ['Pending', 'Progress', 'Success', 'Fail'] as const;
export type GameStatus = typeof GameStatuses[number];

// Board cell types
export const CellTypes = {
  MineExploded: -2,
  Mine: -1,
  Empty: 0,
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
} as const;
export type CellType = typeof CellTypes[keyof typeof CellTypes];

// Board mask types
export const MaskTypes = {
  Open: 0,
  Closed: 1,
  Marked: 2,
  MarkedWrongly: 3,
} as const;
export type MaskType = typeof MaskTypes[keyof typeof MaskTypes];

export interface Board {
  rows: number;
  cols: number;
  bombCount: number;
  cellsGrid: Array<CellType>;
  cellsMask: Array<MaskType>;
}

export interface GameState {
  difficultyLevel: DifficultyLevel;
  gameStatus: GameStatus;
  board: Board;
}

export type Action =
  | { type: 'newGame'; difficultyLevel: DifficultyLevel }
  | { type: 'resetGame' }
  | { type: 'click'; x: number; y: number }
  | { type: 'mark'; x: number; y: number };
