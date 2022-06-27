import React from 'react';

import styles from './Controls.module.scss';
import ResetButton from './ResetButton';
import Tableau from './Tableau';

interface Props {
  onReset: () => void;
}

export default function Controls({ onReset }: Props) {
  return (
    <div className={styles.gameControls}>
      <Tableau number={123} />
      <ResetButton onReset={onReset} />
      <Tableau number={123} />
    </div>
  );
}
