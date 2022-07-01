import { useGameController } from 'game-logic/game-controller';
import { DifficultyLevel } from 'game-logic/types';

import styles from './Game.module.scss';
import GameLayout from './GameLayout';
import CellsGrid from './cells-grid/CellsGrid';
import Controls from './controls/Controls';
import Menu from './menu/Menu';

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
      <Menu onNewGame={newGameHandler} />

      <GameLayout
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
