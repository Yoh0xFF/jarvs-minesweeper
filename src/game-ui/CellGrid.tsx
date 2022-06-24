import { Board } from 'game-logic/types';
import React from 'react';

import Cell from './Cell';
import styles from './CellGrid.module.scss';

interface Props {
  board: Board;
  onCellClick: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function CellGrid({ board, onCellClick, onCellMark }: Props) {
  const { n, boardMap, boardMask } = board;

  return (
    <div className={styles.cellGrid}>
      {boardMap.map((mapValue, i) => {
        const x = Math.floor(i / n);
        const y = i % n;

        return (
          <Cell
            key={`cell-${x}-${y}`}
            x={x}
            y={y}
            mapValue={mapValue}
            maskValue={boardMask[i]}
            onCellClick={onCellClick}
            onCellMark={onCellMark}
          />
        );
      })}
    </div>
  );
}
