import { Dispatch, useReducer } from 'react';

import { generateNewBoard } from '@app/game-logic/board-initialize';
import { markCell, openCell } from '@app/game-logic/board-update';
import {
  Action,
  DifficultyLevel,
  GameState,
  GameStatus,
} from '@app/game-logic/types';
import { boardConfigs } from '@app/game-logic/utils';

// Default initial values
const defaultDifficultyLevel: DifficultyLevel = 'Beginner';
const defaultGameStatus: GameStatus = 'Pending';
const [defaultRows, defaultCols, defaultBombCount] = boardConfigs.get(
  defaultDifficultyLevel
) ?? [0, 0, 0];

// Initial state
const initialState: GameState = {
  difficultyLevel: defaultDifficultyLevel,
  gameStatus: defaultGameStatus,
  board: generateNewBoard(defaultRows, defaultCols, defaultBombCount),
};

function reducer(state: GameState, action: Action): GameState {
  let newBoard, newGameStatus;
  let rows, cols, bombCount;

  switch (action.type) {
    case 'newGame':
      [rows, cols, bombCount] = boardConfigs.get(action.difficultyLevel) ?? [
        0, 0, 0,
      ];

      return {
        difficultyLevel: action.difficultyLevel,
        gameStatus: 'Pending',
        board: generateNewBoard(rows, cols, bombCount),
      };
    case 'resetGame':
      [rows, cols, bombCount] = boardConfigs.get(state.difficultyLevel) ?? [
        0, 0, 0,
      ];

      return {
        ...state,
        gameStatus: 'Pending',
        board: generateNewBoard(rows, cols, bombCount),
      };
    case 'click':
      [newBoard, newGameStatus] = openCell(action.x, action.y, state.board);

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

export function useGameController(): [GameState, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
