import classNames from 'classnames';
import React from 'react';

import styles from './Cell.module.scss';

interface Props {
  x: number;
  y: number;
  value: number;
  hidden: boolean;
}

export default function Cell({ x, y, value, hidden }: Props) {
  let cellType = 'cellClosed';

  if (!hidden) {
    cellType = value < 0 ? 'cellMine' : `cell${value}`;
  }

  return <div className={classNames(styles.cell, styles[cellType])} />;
}
