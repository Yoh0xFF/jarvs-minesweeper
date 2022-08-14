import classNames from 'classnames';
import {
  CellType,
  CellTypes,
  GameStatus,
  MaskType,
  MaskTypes,
} from 'game-logic/types';
import React, { useState } from 'react';

import styles from './Cell.module.scss';

const _cellTypeToClassNameMap = new Map<CellType, string>([
  [CellTypes.Empty, 'open'],
  [CellTypes.MineExploded, 'mineExploded'],
  [CellTypes.Mine, 'mine'],
]);

const _maskTypeToClassNameMap = new Map<MaskType, string>([
  [MaskTypes.Closed, 'closed'],
  [MaskTypes.Marked, 'marked'],
  [MaskTypes.MarkedWrongly, 'markedWrongly'],
]);

interface Props {
  x: number;
  y: number;
  gameStatus: GameStatus;
  cellType: CellType;
  maskType: MaskType;
  onCellOpen: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function Cell({
  x,
  y,
  gameStatus,
  cellType,
  maskType,
  onCellOpen,
  onCellMark,
}: Props) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  let cellClassName;

  if (maskType === MaskTypes.Open)
    cellClassName =
      cellType > 0
        ? `hint${cellType}`
        : _cellTypeToClassNameMap.get(cellType) ?? 'open';
  else cellClassName = _maskTypeToClassNameMap.get(maskType) ?? 'closed';

  return ['Pending', 'Progress'].includes(gameStatus) ? (
    <div
      onClick={(e) => {
        e.preventDefault();
        onCellOpen(x, y);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onCellMark(x, y);
      }}
      onMouseDown={(e) =>
        // We need click effect only when the user clicks closed tile
        setMouseDown(e.button === 0 && maskType === MaskTypes.Closed)
      }
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      className={classNames(
        styles.cell,
        { [styles[cellClassName]]: !mouseDown },
        { [styles.open]: mouseDown }
      )}
      role='button'
    />
  ) : (
    <div
      className={classNames(styles.cell, styles[cellClassName])}
      role='button'
    />
  );
}
