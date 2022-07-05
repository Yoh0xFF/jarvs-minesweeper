import { GameStatus } from 'game-logic/types';
import ResetButton from 'game-ui/controls/ResetButton';
import Tableau from 'game-ui/controls/Tableau';
import Timer from 'game-ui/controls/Timer';
import React from 'react';

import styles from './Controls.module.scss';

interface Props {
  gameStatus: GameStatus;
  bombCount: number;
  onReset: () => void;
}

export default function Controls({ gameStatus, bombCount, onReset }: Props) {
  return (
    <div className={styles.gameControls}>
      <Tableau number={bombCount} />
      <ResetButton gameStatus={gameStatus} onReset={onReset} />
      <Timer gameStatus={gameStatus} />
    </div>
  );
}
