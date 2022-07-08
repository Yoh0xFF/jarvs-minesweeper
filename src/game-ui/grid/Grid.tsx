import classNames from 'classnames';
import { Board, DifficultyLevel, GameStatus } from 'game-logic/types';
import Cell from 'game-ui/grid/Cell';
import React from 'react';

import styles from './Grid.module.scss';

interface Props {
  difficultyLevel: DifficultyLevel;
  gameStatus: GameStatus;
  board: Board;
  onCellOpen: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function Grid({
  difficultyLevel,
  gameStatus,
  board,
  onCellOpen,
  onCellMark,
}: Props) {
  const { grid, mask } = board;

  return (
    <div
      className={classNames(styles.grid, styles[difficultyLevel.toLowerCase()])}
    >
      {grid.map((row, x) =>
        row.map((_, y) => (
          <Cell
            key={`cell-${x}-${y}`}
            x={x}
            y={y}
            gameStatus={gameStatus}
            cellType={grid[x][y]}
            maskType={mask[x][y]}
            onCellOpen={onCellOpen}
            onCellMark={onCellMark}
          />
        ))
      )}
    </div>
  );
}
