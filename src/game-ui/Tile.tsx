import { TileState } from 'game-logic/types';
import React from 'react';

import './Tile.scss';

interface Props {
  tile: TileState;
  x: number;
  y: number;
}

export default function Tile({ tile, x, y }: Props) {
  return <div className='tile'>{tile.value}</div>;
}
