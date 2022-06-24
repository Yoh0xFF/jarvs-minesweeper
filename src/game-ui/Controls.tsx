import React from 'react';

import styles from './Controls.module.scss';
import Tableau from './Tableau';

export default function Controls() {
  return (
    <div className={styles.gameControls}>
      <Tableau number={123} />
      <div className='face face-unpressed' />
      <Tableau number={123} />
    </div>
  );
}
