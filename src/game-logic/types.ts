export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Expert';

export type GameStatus = 'Pending' | 'Progress' | 'Success' | 'Fail';

export type BoardMap = Array<number>;
export type BoardMask = Array<boolean>;

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
