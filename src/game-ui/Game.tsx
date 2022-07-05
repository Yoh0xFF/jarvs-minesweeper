import styles from './Game.module.scss';

import { useGameController } from '@app/game-logic/game-controller';
import { DifficultyLevel } from '@app/game-logic/types';
import GameLayout from '@app/game-ui/GameLayout';
import CellsGrid from '@app/game-ui/cells-grid/CellsGrid';
import Controls from '@app/game-ui/controls/Controls';
import Menu from '@app/game-ui/menu/Menu';

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
