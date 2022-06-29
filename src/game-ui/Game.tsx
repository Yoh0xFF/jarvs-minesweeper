import { useGameController } from 'game-logic/game-logic';
import React from 'react';

import CellsGrid from './CellsGrid';
import Controls from './Controls';
import Layout from './Layout';

export default function Game() {
  const [state, dispatch] = useGameController();

  const cellClickHandler = (x: number, y: number) => {
    dispatch({
      type: 'click',
      x,
      y,
    });
  };

  const cellMarkHandler = (x: number, y: number) => {
    dispatch({
      type: 'mark',
      x,
      y,
    });
  };

  const resetHandler = () => {
    dispatch({
      type: 'newGame',
      difficultyLevel: 'Beginner',
    });
  };

  return (
    <Layout
      controls={
        <Controls
          gameStatus={state.gameStatus}
          bombCount={state.board.bombCount}
          onReset={resetHandler}
        />
      }
      cellsGrid={
        <CellsGrid
          board={state.board}
          onCellClick={cellClickHandler}
          onCellMark={cellMarkHandler}
        />
      }
    />
  );
}
