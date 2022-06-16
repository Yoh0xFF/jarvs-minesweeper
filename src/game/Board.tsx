import React from 'react';

import './Board.scss';
import Tile from './Tile';

export default function Board() {
  return (
    <div className='game-container'>
      <div className='game-header'>
        <div className='corner-top-left' />
        <div className='top-border border-horizontal' />
        <div className='corner-top-right' />

        <div className='face face-unpressed' />

        <div className='left-border border-vertical' />
        <div className='right-border border-vertical' />
      </div>

      <div className='game-board'>
        <div className='joint-left' />
        <div className='top-border border-horizontal' />
        <div className='joint-right' />

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
