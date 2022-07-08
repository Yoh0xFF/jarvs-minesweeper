import { generateNewBoard } from 'game-logic/gameStateInit';
import { markCell, openCell } from 'game-logic/gameStateUpdate';
import {
  Action,
  DifficultyLevel,
  GameState,
  GameStatus,
} from 'game-logic/types';
import { boardConfigs } from 'game-logic/utils';
import { Dispatch, useReducer } from 'react';

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

// State reducer
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
    case 'open':
      const isFirstOpen = state.gameStatus === 'Pending';
      [newBoard, newGameStatus] = openCell(
        action.x,
        action.y,
        state.board,
        isFirstOpen
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