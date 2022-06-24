import { Board } from 'game-logic/types';
import React from 'react';

import Cell from './Cell';
import styles from './CellGrid.module.scss';

interface Props {
  board: Board;
}

export default function CellGrid({ board }: Props) {
  const { n, boardMap, boardMask } = board;

  return (
    <div className={styles.cellGrid}>
      {boardMap.map((value, i) => (
        <Cell
          x={Math.floor(i / n)}
          y={i % n}
          value={value}
          hidden={boardMask[i]}
        />
      ))}
    </div>
  );
}
