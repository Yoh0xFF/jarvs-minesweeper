import React from 'react';

import './Tile.scss';

interface Props {
  x: number;
  y: number;
  value: number;
}

export default function Tile({ x, y, value }: Props) {
  return <div className='tile'>{value}</div>;
}
