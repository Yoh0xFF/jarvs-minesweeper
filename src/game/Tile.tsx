import React from 'react';

import './Tile.scss';

interface Props {
  x: number;
  y: number;
}

export default function Tile({ x, y }: Props) {
  return <div className='tile'></div>;
}
