import classNames from 'classnames';
import React from 'react';

import styles from './CellsGrid.module.scss';

import { Board, DifficultyLevel, GameStatus } from '@app/game-logic/types';
import Cell from '@app/game-ui/cells-grid/Cell';

interface Props {
  difficultyLevel: DifficultyLevel;
  gameStatus: GameStatus;
  board: Board;
  onCellClick: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function CellsGrid({
  difficultyLevel,
  gameStatus,
  board,
  onCellClick,
  onCellMark,
}: Props) {
  const { cols, cellsGrid, cellsMask } = board;

  const gridClassName = `cellsGrid${difficultyLevel}`;

  return (
    <div className={classNames(styles.cellsGrid, styles[gridClassName])}>
      {cellsGrid.map((cellType, i) => {
        const x = Math.floor(i / cols);
        const y = i % cols;

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
