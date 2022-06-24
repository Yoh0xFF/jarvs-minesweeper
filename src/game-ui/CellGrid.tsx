import { Board } from 'game-logic/types';
import React from 'react';

import Cell from './Cell';
import styles from './CellGrid.module.scss';

interface Props {
  board: Board;
  onCellClick: (x: number, y: number) => void;
}

export default function CellGrid({ board, onCellClick }: Props) {
  const { n, boardMap, boardMask } = board;

  return (
    <div className={styles.cellGrid}>
      {boardMap.map((mapValue, i) => (
        <Cell
          x={Math.floor(i / n)}
          y={i % n}
          mapValue={mapValue}
          maskValue={boardMask[i]}
          onCellClick={onCellClick}
        />
      ))}
    </div>
  );
}
