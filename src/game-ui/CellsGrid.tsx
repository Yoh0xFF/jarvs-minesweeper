import { Board, GameStatus } from 'game-logic/types';
import React from 'react';

import Cell from './Cell';
import styles from './CellsGrid.module.scss';

interface Props {
  gameStatus: GameStatus;
  board: Board;
  onCellClick: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function CellsGrid({
  gameStatus,
  board,
  onCellClick,
  onCellMark,
}: Props) {
  const { rows, cellsGrid, cellsMask } = board;

  return (
    <div className={styles.cellsGrid}>
      {cellsGrid.map((cellType, i) => {
        const x = Math.floor(i / rows);
        const y = i % rows;

        return (
          <Cell
            key={`cell-${x}-${y}`}
            x={x}
            y={y}
            gameStatus={gameStatus}
            cellType={cellType}
            maskType={cellsMask[i]}
            onCellClick={onCellClick}
            onCellMark={onCellMark}
          />
        );
      })}
    </div>
  );
}
