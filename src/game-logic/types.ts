export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Expert';

export type GameStatus = 'Pending' | 'Progress' | 'Success' | 'Fail';

export enum CellType {
  'MineExploded' = -2,
  'Mine' = -1,
  'Empty' = 0,
  'One' = 1,
  'Two' = 2,
  'Three' = 3,
  'Four' = 4,
  'Five' = 5,
  'Six' = 6,
  'Seven' = 7,
  'Eight' = 8,
}

export enum MaskType {
  'Open' = 0,
  'Closed' = 1,
  'Marked' = 2,
  'MarkedWrongly' = 3,
}

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
