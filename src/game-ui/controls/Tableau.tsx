import classNames from 'classnames';
import React from 'react';

import styles from './Tableau.module.scss';

const MAX_NUM = 999;
const MIN_NUM = -99;

export interface Props {
  number: number;
}

export default function Tableau({ number }: Props) {
  if (number > MAX_NUM) number = MAX_NUM;
  if (number < MIN_NUM) number = MIN_NUM;

  const negative = number < 0;
  if (negative) number *= -1;

  let x, y, z;

  if (number >= 100) {
    x = Math.floor(number / 100);
    y = Math.floor(number / 10) % 10;
    z = number % 10;
  } else if (number < 100 && number >= 10) {
    x = negative ? -1 : undefined;
    y = Math.floor(number / 10);
    z = number % 10;
  } else {
    x = undefined;
    y = negative ? -1 : undefined;
    z = number;
  }

  return (
    <div className={styles.tableau}>
      <div
        className={classNames(
          styles.digit,
          { [styles[`digit${x}`]]: x && x >= 0 },
          { [styles.minus]: x && x < 0 },
          { [styles.empty]: x === undefined }
        )}
      />

      <span />

      <div
        className={classNames(
          styles.digit,
          { [styles[`digit${y}`]]: y && y >= 0 },
          { [styles.minus]: y && y < 0 },
          { [styles.empty]: y === undefined }
        )}
      />

      <span />

      <div className={classNames(styles.digit, styles[`digit${z}`])} />
    </div>
  );
}
