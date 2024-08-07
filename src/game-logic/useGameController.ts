import { Dispatch, useReducer } from 'react';
import { markCell, openCell } from './gameStateUpdate';
import { Action, DifficultyLevel, GameState, GameStatus } from './types';

// Default initial values
const defaultDifficultyLevel: DifficultyLevel = 'Beginner';
const defaultGameStatus: GameStatus = 'Pending';

// Initial state
const initialState: GameState = {
  difficultyLevel: defaultDifficultyLevel,
  gameStatus: defaultGameStatus,
  board: { rows: 0, cols: 0, mineCount: 0, grid: [], mask: [] },
};

// State reducer
function reducer(state: GameState, action: Action): GameState {
  let newBoard, newGameStatus;

  switch (action.type) {
    case 'newGame':
      return {
        difficultyLevel: action.difficultyLevel,
        gameStatus: 'Pending',
        board: action.board,
      };
    case 'open':
      [newBoard, newGameStatus] = openCell(
        action.x,
        action.y,
        action.board ? action.board : state.board,
      );

      return {
        ...state,
        gameStatus: newGameStatus,
        board: newBoard,
      };
    case 'mark':
      newBoard = markCell(action.x, action.y, state.board);

      return {
        ...state,
        gameStatus: 'Progress',
        board: newBoard,
      };
  }
}

// Game controller hook
export default function useGameController(): [GameState, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
