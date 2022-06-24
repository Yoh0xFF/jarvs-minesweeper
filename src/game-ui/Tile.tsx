import classNames from 'classnames';
import React from 'react';

import styles from './Tile.module.scss';

interface Props {
  x: number;
  y: number;
  value: number;
  hidden: boolean;
}

export default function Tile({ x, y, value, hidden }: Props) {
  let tileType = 'tileClosed';

  if (!hidden) {
    tileType = value < 0 ? 'tileMine' : `tile${value}`;
  }

  return <div className={classNames(styles.tile, styles[tileType])} />;
}
