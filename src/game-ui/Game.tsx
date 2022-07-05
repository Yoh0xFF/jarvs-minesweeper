import { useGameController } from 'game-logic/game-controller';
import { DifficultyLevel } from 'game-logic/types';
import GameLayout from 'game-ui/GameLayout';
import CellsGrid from 'game-ui/cells-grid/CellsGrid';
import Controls from 'game-ui/controls/Controls';
import Menu from 'game-ui/menu/Menu';

import styles from './Game.module.scss';

export default function Game() {
  const [state, dispatch] = useGameController();

  const cellClickHandler = (x: number, y: number) => {
    dispatch({
      type: 'click',
      x,
      y,
    });
  };

  const cellMarkHandler = (x: number, y: number) => {
    dispatch({
      type: 'mark',
      x,
      y,
    });
  };

  const resetHandler = () => {
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
            onReset={resetHandler}
          />
        }
        cellsGrid={
          <CellsGrid
            difficultyLevel={state.difficultyLevel}
            gameStatus={state.gameStatus}
            board={state.board}
            onCellClick={cellClickHandler}
            onCellMark={cellMarkHandler}
          />
        }
      />
    </div>
  );
}
