import { useGameController } from 'game-logic/game-controller';
import React from 'react';

import Layout from './Layout';
import CellsGrid from './cells-grid/CellsGrid';
import Controls from './controls/Controls';

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
          gameStatus={state.gameStatus}
          board={state.board}
          onCellClick={cellClickHandler}
          onCellMark={cellMarkHandler}
        />
      }
    />
  );
}
