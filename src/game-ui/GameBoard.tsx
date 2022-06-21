import { Board } from 'game-logic/types';
import React from 'react';

import './GameBoard.scss';
import Tile from './Tile';

interface Props {
  board: Board;
}

export default function GameBoard({ board }: Props) {
  return (
    <div className='game-board'>
      <div className='content'>
        <div className='border border-vertical' />

        <div className='tiles'>
          {board.map((row, i) =>
            row.map((tile, j) => <Tile tile={tile} x={i} y={j} />)
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
