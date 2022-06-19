import React from 'react';

import './Board.scss';
import GameHeader from './GameHeader';
import Tile from './Tile';

export default function Board() {
  return (
    <div className='game-container'>
      <GameHeader />

      <div className='game-board'>
        <div className='left-border border-vertical' />
        <div className='right-border border-vertical' />

        {[...Array(10)].map((_, i) =>
          [...Array(10)].map((_, j) => <Tile x={i} y={j} />)
        )}

        <div className='corner-bottom-left' />
        <div className='bottom-border border-horizontal' />
        <div className='corner-bottom-right' />
      </div>
    </div>
  );
}
