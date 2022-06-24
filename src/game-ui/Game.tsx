import { useGameController } from 'game-logic/game-logic';

import styles from './Game.module.scss';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';

export default function Game() {
  const [state] = useGameController();

  return (
    <div className={styles.gameContainer}>
      <GameHeader />
      <GameBoard board={state.board} />
    </div>
  );
}
