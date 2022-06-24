import classNames from 'classnames';
import { MapValueType, MaskValueType } from 'game-logic/types';
import React from 'react';

import styles from './Cell.module.scss';

interface Props {
  x: number;
  y: number;
  mapValue: MapValueType;
  maskValue: MaskValueType;
  onCellClick: (x: number, y: number) => void;
  onCellMark: (x: number, y: number) => void;
}

export default function Cell({
  x,
  y,
  mapValue,
  maskValue,
  onCellClick,
  onCellMark,
}: Props) {
  let cellType = 'cellClosed';

  if (maskValue === MaskValueType.Open) {
    switch (mapValue) {
      case MapValueType.MineExploded:
        cellType = 'cellMineExploded';
        break;
      case MapValueType.Mine:
        cellType = 'cellMine';
        break;
      default:
        cellType = `cell${mapValue}`;
    }
  } else {
    switch (maskValue) {
      case MaskValueType.Closed:
        cellType = 'cellClosed';
        break;
      case MaskValueType.Marked:
        cellType = 'cellMarked';
        break;
      case MaskValueType.MarkedWrongly:
        cellType = 'cellMarkedWrongly';
        break;
      default:
        cellType = `cell${mapValue}`;
    }
  }

  return (
    <div
      className={classNames(styles.cell, styles[cellType])}
      onClick={(e) => {
        e.preventDefault();
        onCellClick(x, y);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        onCellMark(x, y);
      }}
    />
  );
}
