export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Expert';

export type GameStatus = 'Pending' | 'Progress' | 'Success' | 'Fail';

export enum MapValueType {
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

export enum MaskValueType {
  'Open' = 0,
  'Closed' = 1,
  'Marked' = 2,
  'MarkedWrongly' = 3,
}

export type BoardMap = Array<MapValueType>;
export type BoardMask = Array<MaskValueType>;

export interface Board {
  n: number;
  m: number;
  bombCount: number;
  boardMap: BoardMap;
  boardMask: BoardMask;
}

export interface GameState {
  difficultyLevel: DifficultyLevel;
  gameStatus: GameStatus;
  board: Board;
}

export type Action =
  | { type: 'newGame'; difficultyLevel: DifficultyLevel }
  | { type: 'click'; x: number; y: number };
