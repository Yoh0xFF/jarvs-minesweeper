import { useGameController } from 'game-logic/game-controller';

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
      type: 'newGame',
      difficultyLevel: 'Beginner',
    });
  };

  return (
    <div className={styles.gameContainer}>
      <Menu />

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
