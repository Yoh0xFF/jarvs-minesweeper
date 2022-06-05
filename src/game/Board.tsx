import React from 'react';

import './Board.scss';
import Tile from './Tile';

export default function Board() {
  return (
    <>
      <div className='board'>
        <div className='corner-top-left' />
        <div className='header border-horizontal' />
        <div className='corner-top-right' />

        <div className='left border-vertical' />
        <div className='right border-vertical' />

        {[...Array(10)].map((_, i) =>
          [...Array(10)].map((_, j) => <Tile x={i} y={j} />)
        )}

        <div className='corner-bottom-left' />
        <div className='footer border-horizontal' />
        <div className='corner-bottom-right' />
      </div>
    </>
  );
}
