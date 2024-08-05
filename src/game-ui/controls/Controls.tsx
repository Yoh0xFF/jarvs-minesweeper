import { GameStatus } from '../../game-logic/types';
import styles from './Controls.module.scss';
import ResetButton from './ResetButton';
import Tableau from './Tableau';
import Timer from './Timer';

interface Props {
  gameStatus: GameStatus;
  mineCount: number;
  onReset: () => void;
}

export default function Controls({ gameStatus, mineCount, onReset }: Props) {
  return (
    <div className={styles.gameControls}>
      <Tableau number={mineCount} />
      <ResetButton gameStatus={gameStatus} onReset={onReset} />
      <Timer gameStatus={gameStatus} />
    </div>
  );
}
