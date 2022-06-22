import React from 'react';

import './Tile.scss';

interface Props {
  x: number;
  y: number;
  value: number;
  hidden: boolean;
}

export default function Tile({ x, y, value, hidden }: Props) {
  let className = 'tile-closed';

  if (!hidden) {
    className = value < 0 ? 'tile-mine' : `tile-${value}`;
  }

  return <div className={className} />;
}
