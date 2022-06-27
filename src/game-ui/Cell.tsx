import classNames from 'classnames';
import { CellType, MaskType } from 'game-logic/types';
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
  [MaskType.MarkedWrongly, 'cellMarked'],
]);

interface Props {
  x: number;
  y: number;
  cellType: CellType;
  maskType: MaskType;
  onCellClick: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function Cell({
  x,
  y,
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

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onCellClick(x, y);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onCellMark(x, y);
      }}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      className={classNames(styles.cell, styles[cellClassName], {
        [styles.cellOpen]: mouseDown,
      })}
    />
  );
}
