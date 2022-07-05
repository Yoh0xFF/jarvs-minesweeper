import React from 'react';

import styles from './Controls.module.scss';

import { GameStatus } from '@app/game-logic/types';
import ResetButton from '@app/game-ui/controls/ResetButton';
import Tableau from '@app/game-ui/controls/Tableau';
import Timer from '@app/game-ui/controls/Timer';

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
