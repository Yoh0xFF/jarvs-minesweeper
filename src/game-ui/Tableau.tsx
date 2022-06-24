import classNames from 'classnames';
import React from 'react';

import styles from './Tableau.module.scss';

export interface Props {
  number: number;
}

export default function Tableau({ number }: Props) {
  const x = Math.floor(number / 100);
  const y = Math.floor(number / 10) % 10;
  const z = number % 10;

  return (
    <div className={styles.tableau}>
      <div className={classNames(styles.digit, styles[`digit${x}`])} />

      <div className={styles.separator} />

      <div className={classNames(styles.digit, styles[`digit${y}`])} />

      <div className={styles.separator} />

      <div className={classNames(styles.digit, styles[`digit${z}`])} />
    </div>
  );
}
