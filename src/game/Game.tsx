import React from 'react';

import './Game.scss';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';

export default function Game() {
  return (
    <div className='game-container'>
      <GameHeader />
      <GameBoard />
    </div>
  );
}
