import generateNewGame from 'game-logic/board-initialize';
import { GameState } from 'game-logic/types';
import React, { useState } from 'react';

import './Game.scss';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';

export default function Game() {
  const [gameState] = useState<GameState>({
    difficultyLevel: 'Beginner',
    gameStatus: 'Pending',
    board: generateNewGame('Beginner'),
  });

  return (
    <div className='game-container'>
      <GameHeader />
      <GameBoard board={gameState.board} />
    </div>
  );
}
