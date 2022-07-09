import { generateNewBoard } from 'game-logic/gameStateInit';
import { DifficultyLevel } from 'game-logic/types';
import useGameController from 'game-logic/useGameController';
import GameLayout from 'game-ui/GameLayout';
import Controls from 'game-ui/controls/Controls';
import Grid from 'game-ui/grid/Grid';
import Menu from 'game-ui/menu/Menu';
import { useEffect } from 'react';

import styles from './Game.module.scss';

export default function Game() {
  const [state, dispatch] = useGameController();

  const openCellHandler = (x: number, y: number) => {
    dispatch({
      type: 'open',
      x,
      y,
    });
  };

  const markCellHandler = (x: number, y: number) => {
    dispatch({
      type: 'mark',
      x,
      y,
    });
  };

  const resetGameHandler = () => {
    // We need to generate board in handler because the reducer needs to be pure.
    const board = generateNewBoard(state.difficultyLevel);

    dispatch({
      type: 'newGame',
      difficultyLevel: state.difficultyLevel,
      board,
    });
  };

  const newGameHandler = (difficultyLevel: DifficultyLevel) => {
    // We need to generate board in handler because the reducer needs to be pure.
    const board = generateNewBoard(difficultyLevel);

    dispatch({
      type: 'newGame',
      difficultyLevel,
      board,
    });
  };

  // Init new game on mount
  useEffect(() => {
    newGameHandler(state.difficultyLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.gameContainer}>
      <Menu
        difficultyLevel={state.difficultyLevel}
        onNewGame={newGameHandler}
      />

      <GameLayout
        gameStatus={state.gameStatus}
        controls={
          <Controls
            gameStatus={state.gameStatus}
            bombCount={state.board.bombCount}
            onReset={resetGameHandler}
          />
        }
        grid={
          <Grid
            difficultyLevel={state.difficultyLevel}
            gameStatus={state.gameStatus}
            board={state.board}
            onCellOpen={openCellHandler}
            onCellMark={markCellHandler}
          />
        }
      />
    </div>
  );
}
