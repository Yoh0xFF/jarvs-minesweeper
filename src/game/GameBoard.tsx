import React from 'react';

import './GameBoard.scss';
import Tile from './Tile';

export default function GameBoard() {
  return (
    <div className='game-board'>
      <div className='content'>
        <div className='border border-vertical' />

        <div className='tiles'>
          {[...Array(10)].map((_, i) =>
            [...Array(10)].map((_, j) => <Tile x={i} y={j} />)
          )}
        </div>

        <div className='border border-vertical' />
      </div>

      <div className='footer'>
        <div className='corner corner-bottom-left' />
        <div className='border border-horizontal' />
        <div className='corner corner-bottom-right' />
      </div>
    </div>
  );
}
