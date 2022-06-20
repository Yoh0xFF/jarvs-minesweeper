export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Expert';

export type GameStatus = 'Pending' | 'Progress' | 'Success' | 'Fail';

export type Board = Array<Array<number>>;

export interface GameState {
  difficultyLevel: DifficultyLevel;
  gameStatus: GameStatus;
  board: Board;
}

export type Action =
  | { type: 'newGame'; difficultyLevel: DifficultyLevel }
  | { type: 'click'; x: number; y: number };
