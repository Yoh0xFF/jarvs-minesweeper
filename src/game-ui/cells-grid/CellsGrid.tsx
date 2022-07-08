import classNames from 'classnames';
import { Board, DifficultyLevel, GameStatus } from 'game-logic/types';
import Cell from 'game-ui/cells-grid/Cell';
import React from 'react';

import styles from './CellsGrid.module.scss';

interface Props {
  difficultyLevel: DifficultyLevel;
  gameStatus: GameStatus;
  board: Board;
  onCellOpen: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function CellsGrid({
  difficultyLevel,
  gameStatus,
  board,
  onCellOpen,
  onCellMark,
}: Props) {
  const { cellsGrid, cellsMask } = board;

  const gridClassName = `cellsGrid${difficultyLevel}`;

  return (
    <div className={classNames(styles.cellsGrid, styles[gridClassName])}>
      {cellsGrid.map((row, x) =>
        row.map((_, y) => (
          <Cell
            key={`cell-${x}-${y}`}
            x={x}
            y={y}
            gameStatus={gameStatus}
            cellType={cellsGrid[x][y]}
            maskType={cellsMask[x][y]}
            onCellOpen={onCellOpen}
            onCellMark={onCellMark}
          />
        ))
      )}
    </div>
  );
}
