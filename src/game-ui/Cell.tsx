import classNames from 'classnames';
import { CellType, GameStatus, MaskType } from 'game-logic/types';
import React, { useState } from 'react';

import styles from './Cell.module.scss';

const cellTypeMap = new Map<CellType, string>([
  [CellType.Empty, 'cellOpen'],
  [CellType.MineExploded, 'cellMineExploded'],
  [CellType.Mine, 'cellMine'],
]);

const maskTypeMap = new Map<MaskType, string>([
  [MaskType.Closed, 'cellClosed'],
  [MaskType.Marked, 'cellMarked'],
  [MaskType.MarkedWrongly, 'cellMarkedWrongly'],
]);

interface Props {
  x: number;
  y: number;
  gameStatus: GameStatus;
  cellType: CellType;
  maskType: MaskType;
  onCellClick: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function Cell({
  x,
  y,
  gameStatus,
  cellType,
  maskType,
  onCellClick,
  onCellMark,
}: Props) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  let cellClassName = 'cellClosed';

  if (maskType === MaskType.Open) {
    cellClassName =
      cellType > 0
        ? `cell${cellType}`
        : cellTypeMap.get(cellType) ?? 'cellOpen';
  } else {
    cellClassName = maskTypeMap.get(maskType) ?? 'cellClosed';
  }

  return ['Pending', 'Progress'].includes(gameStatus) ? (
    <div
      onClick={(e) => {
        e.preventDefault();
        onCellClick(x, y);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onCellMark(x, y);
      }}
      onMouseDown={(e) =>
        // We need click effect only when the user clicks closed tile
        setMouseDown(e.button === 0 && maskType === MaskType.Closed)
      }
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      className={classNames(
        styles.cell,
        { [styles[cellClassName]]: !mouseDown },
        { [styles.cellOpen]: mouseDown }
      )}
    />
  ) : (
    <div className={classNames(styles.cell, styles[cellClassName])} />
  );
}
