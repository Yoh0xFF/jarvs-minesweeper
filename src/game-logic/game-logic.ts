import { Dispatch, useReducer } from 'react';

import generateNewGame from './board-initialize';
import updateGame from './board-update';
import { Action, GameState } from './types';

const initialState: GameState = {
  difficultyLevel: 'Beginner',
  gameStatus: 'Pending',
  board: [],
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'newGame':
      return {
        difficultyLevel: action.difficultyLevel,
        gameStatus: 'Pending',
        board: generateNewGame(action.difficultyLevel),
      };
    case 'click':
      return {
        difficultyLevel: 'Beginner',
        gameStatus: 'Pending',
        board: updateGame(state.board, action.x, action.y),
      };
    default:
      throw new Error();
  }
}

export function useGameController(): [GameState, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
