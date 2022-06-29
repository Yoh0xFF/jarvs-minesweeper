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
      <div
        className={classNames(
          styles.digit,
          { [styles[`digit${x}`]]: x > 0 },
          { [styles.digitEmpty]: x === 0 }
        )}
      />

      <span />

      <div
        className={classNames(
          styles.digit,
          { [styles[`digit${y}`]]: x > 0 || y > 0 },
          { [styles.digitEmpty]: x === 0 && y === 0 }
        )}
      />

      <span />

      <div className={classNames(styles.digit, styles[`digit${z}`])} />
    </div>
  );
}
