import { GameStatus } from 'game-logic/types';
import React from 'react';

import styles from './Controls.module.scss';
import ResetButton from './ResetButton';
import Tableau from './Tableau';
import Timer from './Timer';

interface Props {
  gameStatus: GameStatus;
  onReset: () => void;
}

export default function Controls({ gameStatus, onReset }: Props) {
  return (
    <div className={styles.gameControls}>
      <Tableau number={123} />
      <ResetButton onReset={onReset} />
      <Timer gameStatus={gameStatus} />
    </div>
  );
}
