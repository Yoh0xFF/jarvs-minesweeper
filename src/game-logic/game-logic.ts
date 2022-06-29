import { Dispatch, useReducer } from 'react';

import { generateNewBoard } from './board-initialize';
import { markCell, openCell } from './board-update';
import { Action, DifficultyLevel, GameState } from './types';

const boardConfigs = new Map<DifficultyLevel, [number, number, number]>([
  ['Beginner', [9, 9, 10]],
  ['Intermediate', [16, 16, 40]],
  ['Expert', [30, 16, 99]],
]);

const defaultDifficultyLevel: DifficultyLevel = 'Beginner';

const defaultBoardConfig: [number, number, number] = boardConfigs.get(
  defaultDifficultyLevel
) ?? [0, 0, 0];

const initialState: GameState = {
  difficultyLevel: defaultDifficultyLevel,
  gameStatus: 'Pending',
  board: generateNewBoard(
    defaultBoardConfig[0],
    defaultBoardConfig[1],
    defaultBoardConfig[2]
  ),
};

function reducer(state: GameState, action: Action): GameState {
  let newBoard;

  switch (action.type) {
    case 'newGame':
      return {
        difficultyLevel: action.difficultyLevel,
        gameStatus: 'Pending',
        board: generateNewBoard(
          defaultBoardConfig[0],
          defaultBoardConfig[1],
          defaultBoardConfig[2]
        ),
      };
    case 'click':
      newBoard = openCell(action.x, action.y, state.board);

      return {
        ...state,
        gameStatus: 'Progress',
        board: newBoard,
      };
    case 'mark':
      newBoard = markCell(action.x, action.y, state.board);

      return {
        ...state,
        gameStatus: 'Progress',
        board: newBoard,
      };
    default:
      throw new Error();
  }
}

export function useGameController(): [GameState, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
