import { DifficultyLevel } from 'game-logic/types';
import useGameController from 'game-logic/useGameController';
import GameLayout from 'game-ui/GameLayout';
import CellsGrid from 'game-ui/cells-grid/CellsGrid';
import Controls from 'game-ui/controls/Controls';
import Menu from 'game-ui/menu/Menu';

import styles from './Game.module.scss';

export default function Game() {
  const [state, dispatch] = useGameController();

  const openCellHandler = (x: number, y: number) => {
    dispatch({
      type: 'click',
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
    dispatch({
      type: 'resetGame',
    });
  };

  const newGameHandler = (difficultyLevel: DifficultyLevel) => {
    dispatch({
      type: 'newGame',
      difficultyLevel,
    });
  };

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
        cellsGrid={
          <CellsGrid
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
